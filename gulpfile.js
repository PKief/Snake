'use strict';

const gulp = require('gulp'),
  sass = require('gulp-sass');

const scss = (cb) => {
  gulp.src('src/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('src'));
  cb();
};

const watch_scss = (cb) => {
  gulp.watch('src/*.scss', scss);
  cb();
};


gulp.task('default', gulp.series(scss, watch_scss));
