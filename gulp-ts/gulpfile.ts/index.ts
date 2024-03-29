import * as gulp from 'gulp';
import * as fs from 'fs';
import './foo';

gulp.task('default', (cb) => {
  console.log('Hello, Gulp!');
  cb();
});

function cleanDir(dir: string): void {
  if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true });
  }
}

gulp.task(function clean(cb: () => void): void {
  cleanDir(`./node_modules`);
  cb();
});