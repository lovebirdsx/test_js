import * as fs from 'fs';

class TestFile {
    static testBasic() {
        const content = fs.readFileSync('.gitignore');
        console.log(content.toString());
    }

    static Run() {
        TestFile.testBasic();
    }
}

TestFile.Run();
