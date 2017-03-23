const gulp = require('gulp');
const source = require("vinyl-source-stream");
const rollup = require('rollup-stream');
const del = require('del');

const dist = './dist';

gulp.task('default', [
    // 'clean',
    // 'copyStaticFiles',
    'build']);

gulp.task('clean', function () {
    return del(dist + '/**/*');
});

gulp.task("copyStaticFiles", function () {
    return gulp.src("./extension/**")
        .pipe(gulp.dest("./dist"));
});

gulp.task('build', ['buildBackground']);

gulp.task("buildBackground", function () {
    return rollup({
        entry: './src/background.js'
    })
        .pipe(source('background.js'))
        .pipe(gulp.dest(dist));
});
