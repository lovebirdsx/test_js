import * as fs from 'fs';
import path = require('path');

function TestFile() {
    function testBasic() {
        const content = fs.readFileSync('.gitignore');
        console.log(content.toString());
    }

    function getDir(path: string): string {
        let lastSepPosition = path.lastIndexOf('/');
        if (lastSepPosition === -1) {
            lastSepPosition = path.lastIndexOf('\\');
        }
        if (lastSepPosition === -1) {
            return '';
        }
        return path.slice(0, lastSepPosition);
    }

    function testPath() {
        console.log('c:\\foo\\bar.txt', getDir('c:\\foo\\bar.txt'));
        console.log('c:/foo/bar.txt', getDir('c:/foo/bar.txt'));
        console.log('c:\\foo\\bar.txt', path.normalize('c:\\foo\\bar.txt'));
        console.log('c:/foo/../bar.txt', path.normalize('c:/foo/../bar.txt'));
    }

    // testBasic();
    testPath();
}

TestFile();
