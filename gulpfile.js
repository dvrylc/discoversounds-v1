var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');

gulp.task('default', ['css', 'js'], function() {
});

gulp.task('css', function() {

  gulp.src('./css/*.scss')
  .pipe(sass())
  .pipe(minifyCSS())
  .pipe(gulp.dest('./dist/css/'));

  gulp.src('./css/*.css')
  .pipe(minifyCSS())
  .pipe(gulp.dest('./dist/css/'));

});

gulp.task('js', function() {

  gulp.src('./js/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(jshint.reporter('fail'))
  .pipe(uglify())
  .pipe(gulp.dest('./dist/js/'));

  gulp.src('./js/libs/*.js')
  .pipe(gulp.dest('./dist/js/libs/'));

});
