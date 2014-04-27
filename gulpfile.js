var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    rename = require('gulp-rename'),
    lr = require('tiny-lr'),
    server = lr();

gulp.task('css', function() {
  return gulp.src('stylesheets/styles.css')
             .pipe(gulp.dest('build/css'))
             .pipe(rename({ suffix: '.min' }))
             .pipe(minifycss())
             .pipe(livereload(server))
             .pipe(gulp.dest('build/css'));
});

gulp.task('scripts', function() {
  return gulp.src('src/**/*.js')
             .pipe(concat('main.js'))
             .pipe(gulp.dest('build/javascript'))
             .pipe(rename({ suffix: '.min' }))
             .pipe(uglify())
             .pipe(livereload(server))
             .pipe(gulp.dest('build/javascript'));
});

gulp.task('default', function() {
  gulp.start('css', 'scripts');
});
