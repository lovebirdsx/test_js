import { getVersion } from './common/lib';

const infos: string[] = ['Hello World!', 'Welcome to my first TypeScript project!', 'Version: ' + getVersion()];

function main() {
	console.log(infos.join('\n'));
}

main();
