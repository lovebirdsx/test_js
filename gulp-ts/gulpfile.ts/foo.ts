import * as gulp from 'gulp';

gulp.task('foo', (cb) => {
    console.log('Hello, foo!');
    cb();
});
