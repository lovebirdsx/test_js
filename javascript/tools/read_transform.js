#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';

function printUsage() {
	console.log('用法: node read_transform.js <inputDir|.> [--out <outputFile>] [--print]');
}

async function collectJsonFiles(rootDir) {
	const files = [];
	const pendingDirs = [rootDir];

	while (pendingDirs.length > 0) {
		const currentDir = pendingDirs.pop();
		const entries = await fs.readdir(currentDir, { withFileTypes: true });

		for (const entry of entries) {
			const fullPath = path.join(currentDir, entry.name);
			if (entry.isDirectory()) {
				pendingDirs.push(fullPath);
				continue;
			}

			if (entry.isFile() && entry.name.toLowerCase().endsWith('.json')) {
				files.push(fullPath);
			}
		}
	}

	return files;
}

function parseArgs(argv) {
	const args = argv.slice(2);
	let inputDir = null;
	let outputFile = null;
	let print = false;

	for (let i = 0; i < args.length; i += 1) {
		const arg = args[i];
		if (arg === '--print') {
			print = true;
			continue;
		}

		if (arg === '--out' || arg === '-o') {
			const next = args[i + 1];
			if (!next || next.startsWith('-')) {
				throw new Error('参数 --out 需要一个输出文件路径');
			}
			outputFile = next;
			i += 1;
			continue;
		}

		if (arg.startsWith('-')) {
			throw new Error(`不支持的参数: ${arg}`);
		}

		if (inputDir) {
			throw new Error('只能传入一个目录参数');
		}
		inputDir = arg;
	}

	if (!inputDir) {
		throw new Error('请传入要读取的目录');
	}

	return {
		inputDir: path.resolve(inputDir),
		outputFile: outputFile ? path.resolve(outputFile) : null,
		print,
	};
}

function toNumberOrDefault(value, defaultValue = 0) {
	return Number.isFinite(value) ? value : defaultValue;
}

function extractPos(record) {
	const pos = record?.Transform?.Pos;
	return {
		x: toNumberOrDefault(pos?.X, 0),
		y: toNumberOrDefault(pos?.Y, 0),
		z: toNumberOrDefault(pos?.Z, 0),
	};
}

async function main() {
	let parsedArgs;
	try {
		parsedArgs = parseArgs(process.argv);
	} catch (error) {
		console.error(`[Error] ${error instanceof Error ? error.message : String(error)}`);
		printUsage();
		process.exitCode = 1;
		return;
	}

	const { inputDir, outputFile, print } = parsedArgs;

	const start = process.hrtime.bigint();

	let files;
	try {
		files = await collectJsonFiles(inputDir);
	} catch (error) {
		console.error(`[Error] 读取目录失败: ${inputDir}`);
		console.error(error instanceof Error ? error.message : String(error));
		process.exitCode = 1;
		return;
	}

	const positions = new Array(files.length);
	let parsedCount = 0;
	let failedCount = 0;

	const workerCount = Math.max(1, Math.min(files.length, os.cpus().length * 4));
	let index = 0;

	async function worker() {
		while (true) {
			const current = index;
			index += 1;
			if (current >= files.length) {
				return;
			}

			const filePath = files[current];
			try {
				const text = await fs.readFile(filePath, 'utf8');
				const data = JSON.parse(text);
				const pos = extractPos(data);

				positions[current] = {
					id: data?.Id ?? null,
					name: data?.Name ?? path.basename(filePath),
					pos,
				};
				parsedCount += 1;
			} catch {
				failedCount += 1;
			}
		}
	}

	await Promise.all(Array.from({ length: workerCount }, () => worker()));

	const elapsedMs = Number(process.hrtime.bigint() - start) / 1_000_000;

	console.log(`目录: ${inputDir}`);
	console.log(`JSON 文件数量: ${files.length}`);
	console.log(`成功解析数量: ${parsedCount}`);
	console.log(`失败数量: ${failedCount}`);
	console.log(`耗时: ${elapsedMs.toFixed(2)} ms`);

	if (outputFile) {
		const outputData = {
			inputDir,
			totalFiles: files.length,
			parsedCount,
			failedCount,
			elapsedMs: Number(elapsedMs.toFixed(2)),
			positions: positions.filter(Boolean),
		};
		await fs.mkdir(path.dirname(outputFile), { recursive: true });
		await fs.writeFile(outputFile, `${JSON.stringify(outputData, null, 2)}\n`, 'utf8');
		console.log(`结果文件: ${outputFile}`);
	}

	if (print) {
		for (const item of positions) {
			if (!item) continue;
			console.log(`${item.id}\t${item.name}\t(${item.pos.x}, ${item.pos.y}, ${item.pos.z})`);
		}
	}
}

main();
