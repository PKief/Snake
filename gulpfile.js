'use strict';

var gulp = require('gulp'),            
    sass = require('gulp-sass');    

gulp.task('sass', function () {
  gulp.src('src/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('src'));    
});

gulp.task('watch_scss', function() {  
  gulp.watch('src/*.scss', ['sass']);
});


gulp.task('default', ['watch_scss']);
