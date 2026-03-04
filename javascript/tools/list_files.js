#!/usr/bin/env node

import { promises as fs } from 'node:fs';
import path from 'node:path';

async function countFiles(dirPath) {
	const entries = await fs.readdir(dirPath, { withFileTypes: true });
	let total = 0;

	for (const entry of entries) {
		const fullPath = path.join(dirPath, entry.name);

		if (entry.isFile()) {
			total += 1;
			continue;
		}

		if (entry.isDirectory()) {
			total += await countFiles(fullPath);
		}
	}

	return total;
}

async function main() {
	const startTime = process.hrtime.bigint();
	const inputPath = process.argv[2] || '.';
	const targetPath = path.resolve(process.cwd(), inputPath);

	try {
		const stat = await fs.stat(targetPath);

		if (!stat.isDirectory()) {
			console.error(`错误: 目标路径不是目录 -> ${targetPath}`);
			process.exitCode = 1;
			return;
		}

		const total = await countFiles(targetPath);
		const elapsedMs = Number(process.hrtime.bigint() - startTime) / 1_000_000;
		console.log(`目录: ${targetPath}`);
		console.log(`文件总数: ${total}`);
		console.log(`运行耗时: ${elapsedMs.toFixed(2)} ms`);
	} catch (error) {
		console.error(`错误: 无法访问目录 -> ${targetPath}`);
		console.error(error.message);
		process.exitCode = 1;
	}
}

main();
