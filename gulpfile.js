const gulp = require('gulp');
const source = require("vinyl-source-stream");
const rollup = require('rollup-stream');
const del = require('del');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const rename = require('gulp-rename');
const uncss = require('gulp-uncss');

const dist = './dist';

const scripts = [
    {taskName: 'buildBackground', entry: './src/background.js',      source: 'background.js', dest: dist},
    {taskName: 'buildOptions',    entry: './src/options/options.js', source: 'options.js',    dest: dist + '/options'}
];

let rollupCache;

gulp.task('default', ['build']);

gulp.task('clean', function () {
    return del([dist + '/**/*',  dist + '/.*', './web-ext-artifacts/']);
});

gulp.task("copyStaticFiles", function () {
    return gulp.src([
            './extension/**',
            '!./extension/icons/scale-169.png',
            '!./extension/options/bootstrap.min.css'])
        .pipe(gulp.dest(dist));
});

gulp.task("reduceCss", function () {
    return gulp.src('./extension/options/bootstrap.min.css')
        .pipe(uncss({
            html: ['./extension/options/options.html'],
            ignore: ['.list-group-item', '.list-group-item.active']
        }))
        .pipe(rename('bootstrap.min.reduced.css'))
        .pipe(gulp.dest(dist + '/options'));
});

const scriptTasks = scripts.map(script => ({
    taskName: script.taskName,
    opCreator: () => rollup({
        entry: script.entry,
        format: 'es',
        plugins: [
            resolve()
            ,commonjs()
        ],
        cache: rollupCache,
        exports: 'none'
    })
        .pipe(source(script.source))
        .pipe(gulp.dest(script.dest))
}));

for (let scriptTask of scriptTasks) {
    gulp.task(scriptTask.taskName, scriptTask.opCreator);
}

const scriptTaskNames = () => scripts.map(s => s.taskName);

gulp.task('build', ['copyStaticFiles', 'reduceCss'].concat(scriptTaskNames()));
