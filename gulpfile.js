const gulp = require('gulp');
const source = require("vinyl-source-stream");
const rollup = require('rollup-stream');
const del = require('del');
const commonjs = require('rollup-plugin-commonjs');

const dist = './dist';

gulp.task('default', ['build']);

gulp.task('clean', function () {
    return del(dist + '/**/*');
});

gulp.task("copyStaticFiles", function () {
    return gulp.src("./extension/**")
        .pipe(gulp.dest("./dist"));
});

gulp.task('build', ['copyStaticFiles', 'buildBackground', 'buildsettings']);

gulp.task('buildBackground', function () {
    return rollup({
        entry: './src/background.js',
        format: 'es',
        exports: 'none'
    })
        .pipe(source('background.js'))
        .pipe(gulp.dest(dist));
});

gulp.task('buildsettings', function () {
    return rollup({
        entry: './src/settings/settings.js',
        format: 'es',
        exports: 'none'
    })
        .pipe(source('settings.js'))
        .pipe(gulp.dest(dist + '/settings'));
});
