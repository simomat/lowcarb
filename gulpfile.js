const gulp = require('gulp');
const source = require("vinyl-source-stream");
const rollup = require('rollup-stream');
const del = require('del');

const dist = './dist';

gulp.task('default', ['build']);

gulp.task('clean', function () {
    return del([dist + '/**/*',  dist + '/.*', './web-ext-artifacts/']);
});

gulp.task("copyStaticFiles", function () {
    return gulp.src(['./extension/**', '!./extension/icons/scale-169.png'])
        .pipe(gulp.dest("./dist"));
});

gulp.task('buildBackground', function () {
    return rollup({
        entry: './src/background.js',
        format: 'es',
        exports: 'none'
    })
        .pipe(source('background.js'))
        .pipe(gulp.dest(dist));
});

gulp.task('buildOptions', function () {
    return rollup({
        entry: './src/options/options.js',
        format: 'es',
        exports: 'none'
    })
        .pipe(source('options.js'))
        .pipe(gulp.dest(dist + '/options'));
});

gulp.task('build', ['copyStaticFiles', 'buildBackground', 'buildOptions']);
