const gulp = require("gulp");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const livereload = require("gulp-livereload");

// CSS task
function css() {
  return gulp
    .src("stylesheets/styles.css")
    .pipe(gulp.dest("build/css"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(cleanCSS())
    .pipe(livereload())
    .pipe(gulp.dest("build/css"));
}

// Scripts task
function scripts() {
  return gulp
    .src("src/**/*.js")
    .pipe(concat("main.js"))
    .pipe(gulp.dest("build/javascript"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(uglify())
    .pipe(livereload())
    .pipe(gulp.dest("build/javascript"));
}

// Watch task
function watch() {
  livereload.listen();
  gulp.watch("stylesheets/**/*.css", css);
  gulp.watch("src/**/*.js", scripts);
}

// Export tasks
exports.css = css;
exports.scripts = scripts;
exports.watch = watch;
exports.default = gulp.parallel(css, scripts);
