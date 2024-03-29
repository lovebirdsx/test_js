const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const gutil = require('gulp-util');
require('./ts');

gulp.task('compress', function () {
  return gulp.src('src/**/*.js') // 指定要处理的文件
    .pipe(uglify()) // 压缩文件
    .pipe(rename({ extname: '.min.js' })) // 重命名
    .pipe(gulp.dest('dist/js')); // 指定处理后的文件输出目录
});

function clean(cb) {
  cb();
}

function build(cb) {
  gutil.log('build');
  cb();
}

function task1(cb) {
  setTimeout(() => {
    console.log('parallel1');
    cb();
  }, 1000);
}

function task2(cb) {
  setTimeout(() => {
    console.log('parallel2');
    cb();
  }, 1000);
}

gulp.task('build', build);
gulp.task('parallel', gulp.parallel(task1, task2));
gulp.task('series', gulp.series(task1, task2));
gulp.task('default', gulp.series(clean, build));
