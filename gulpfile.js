const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const htmlmin = require('gulp-htmlmin');
const minifyCss = require('gulp-minify-css');
const uglify = require('gulp-uglify');

gulp.task('minify-html', () => {
 return gulp.src('www/src/**/*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('www/dist'));
});

gulp.task('minify-css', () => {
 return gulp.src(['www/src/styles/**/*.scss'])
 .pipe(sass().on('error', sass.logError))
 .pipe(minifyCss())
 .pipe(gulp.dest('www/dist/styles'));
});

gulp.task('uglify-js', () => {
 return gulp.src(['www/src/scripts/**/*.js'])
  .pipe(uglify())
  .pipe(gulp.dest('www/dist/scripts'));
});

gulp.task('build', gulp.parallel('minify-html', 'minify-css', 'uglify-js'));

gulp.task('watch', () => {
 gulp.watch('www/src/**/*.html', gulp.series('minify-html'));
 gulp.watch('www/src/styles/**/*.scss', gulp.series('minify-css'));
 gulp.watch('www/src/scripts/**/*.js', gulp.series('uglify-js'));
});