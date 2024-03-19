const { exec } = require('child_process');
const gulp = require('gulp');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json');

gulp.task('tsc', () => {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('dist'));
});

gulp.task('run', (cb) => {
    exec('node dist/main.js', (err, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('watch', gulp.series('tsc', 'run', () => {
    gulp.watch('src/**/*.ts', gulp.series('tsc', 'run'));
}));
