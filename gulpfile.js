const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint');
const concat = require('gulp-concat');

gulp.task('sass', () => {
  gulp.src('./client/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./hosted/style/'));
});

gulp.task('js', () => {
  // Default bundle
  gulp.src(['./client/*.js', './client/helper/*.js'])
    .pipe(concat('bundle.js'))
    .pipe(babel({
      presets: ['env', 'react']
    }))
    .pipe(gulp.dest('./hosted/'));

  // App Bundle
  gulp.src(['./client/app/*.js', './client/helper/*.js'])
    .pipe(concat('appBundle.js'))
    .pipe(babel({
      presets: ['env', 'react']
    }))
    .pipe(gulp.dest('./hosted/'));

});

gulp.task('lint', () => {
  return gulp.src(['./server/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('watch', () => {
  gulp.watch('./client/scss/*.scss', ['sass']);
  gulp.watch(['./client/*.js', './client/**/*.js'], ['js']);

  nodemon({
    script: './server/app.js'
    , ext: 'js'
    , tasks: ['lint']
  })
});

gulp.task('build', () => {
  gulp.start('sass');
  gulp.start('js');
  gulp.start('lint');
});
