const gulp = require('gulp');
const concatCss = require('gulp-concat-css');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const pipeline = require('readable-stream').pipeline;
 
gulp.task('default', function () {
  return gulp.src('styles/*.css')
    .pipe(concatCss("styles/bundle.css"))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('out/'));
});

gulp.task('compress', function () {
    return pipeline(
          gulp.src('js/*.js'),
          uglify(),
          gulp.dest('dist')
    );
});