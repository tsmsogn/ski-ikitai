var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var browserSync = require('browser-sync').create();
var notify = require('gulp-notify');

gulp.task('sass', function () {
  gulp.src('./src/scss/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(sass())
    .pipe(gulp.dest('./docs/assets/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('pug', function () {
  gulp.src(
    ['src/pug/**/*.pug', '!' + 'src/pug/**/_*.pug']
  )
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('./docs'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('watch', function () {
  gulp.watch('./src/scss/**/*.scss', ['sass']);
  gulp.watch('./src/pug/**/*.pug', ['pug']);
});

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: './docs'
    }
  });
});

gulp.task('default', ['browser-sync', 'watch']);
