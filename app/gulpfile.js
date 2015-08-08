var gulp = require('gulp');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var filter = require('gulp-filter');
var debug = require('gulp-debug');
var del = require('del');
var mainBowerFiles = require('main-bower-files');

gulp.task('default', ['clean'],function() {
    return gulp.start('build', 'watch')
});

gulp.task('build', ['clean'],function() {
    return gulp.start('libs', 'css')
});

gulp.task('clean', function (cb) {
    del([
        'dist/**/*'
    ], cb);
});

gulp.task('libs', function() {
    return gulp.src(mainBowerFiles())
        .pipe(gulp.dest('dist/lib'))
});

gulp.task('css', function() {
    return gulp.src('static/style/*.less')
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/style'))
});

gulp.task('watch', function() {
    gulp.watch('static/style/*.less', function() {
        gulp.start('css')
    });
});