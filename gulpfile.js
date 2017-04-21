const gulp = require('gulp');
const source = require("vinyl-source-stream");
const rollup = require('rollup-stream');
const del = require('del');

const dist = './dist';

gulp.task('default', ['build']);

gulp.task('clean', function () {
    return del(dist + '/**/*');
});

gulp.task("copyStaticFiles", function () {
    return gulp.src("./extension/**")
        .pipe(gulp.dest("./dist"));
});

gulp.task('build', ['copyStaticFiles', 'buildBackground', 'buildpopup']);

gulp.task('buildBackground', function () {
    return rollup({
        entry: './src/background.js',
        format: 'es',
        exports: 'none'
    })
        .pipe(source('background.js'))
        .pipe(gulp.dest(dist));
});

gulp.task('buildpopup', function () {
    return rollup({
        entry: './src/popup/popup.js',
        format: 'es',
        exports: 'none'
    })
        .pipe(source('popup.js'))
        .pipe(gulp.dest(dist + '/popup'));
});
