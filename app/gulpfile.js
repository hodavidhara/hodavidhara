var gulp = require('gulp');
var browserify = require('gulp-browserify');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var filter = require('gulp-filter');
var debug = require('gulp-debug');
var plumber = require('gulp-plumber');
var del = require('del');
var mainBowerFiles = require('main-bower-files');

var hbsfy = require("hbsfy").configure({
    precompilerOptions: {
        knownHelpers: {
            "dateFormat": true
        }
    }
});

gulp.task('default', ['build', 'watch']);
gulp.task('prod', ['build', 'compress-js', 'compress-css']);

gulp.task('build', ['clean', 'libs', 'js', 'css']);
gulp.task('clean', ['clean-libs', 'clean-js', 'clean-css']);

gulp.task('clean-libs', function (cb) {
    del([
        'dist/libs/*'
    ], cb);
});

gulp.task('clean-js', function (cb) {
    del([
        'dist/js/*'
    ], cb);
});

gulp.task('clean-css', function (cb) {
    del([
        'dist/css/*'
    ], cb);
});

gulp.task('libs', ['clean-libs'], function() {
    return gulp.src(mainBowerFiles())
        .pipe(gulp.dest('dist/lib'))
});

gulp.task('js', ['clean-js'], function() {
    return gulp.src('static/js/*.js')
        .pipe(plumber())
        .pipe(browserify({
            debug : true,
            transform: [hbsfy]
        }))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('css', ['clean-css'], function() {
    return gulp.src('static/style/*.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(gulp.dest('dist/style'))
});

gulp.task('compress-js', ['js'], function () {
    return gulp.src('dist/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('compress-css', ['css'], function () {
    return gulp.src('dist/style/*')
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function() {
    gulp.watch('static/style/*.less', ['css']);
    gulp.watch('static/js/**/*', ['js']);
});