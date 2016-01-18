var path       = require('path');
var gulp       = require('gulp');
var ts         = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var gls        = require('gulp-live-server');


var buildDest = function(loc) {
  var tsProject = ts.createProject(path.resolve(loc, 'tsconfig.json'));

  return gulp.src(path.resolve(loc, '**/*.ts'))
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject))
    .js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.resolve(loc))); 
}

gulp.task('build:server', function() {
  return buildDest('server');
});

gulp.task('build:client', function() {
  return buildDest('client');
});

gulp.task('watch', function() {
    gulp.watch('client/**/*.ts', ['build:client']);
    gulp.watch('server/**/*.ts', ['build:server']);
});

gulp.task('serve', ['watch'], function() {
  var server = gls.new('server/app.js');
  server.start();

  // watch css, html, and js
  gulp.watch([
    'client/**/*.css', 
    'client/**/*.html', 
    'client/**/*.js'
  ], 
  function(file) {
    console.log("\nChanged: " + file.path);
    console.log("Reloading server\n");
    server.notify.apply(server, [file]);
  });

  // restart server on change
  gulp.watch('server/app.js', server.start.bind(server));

})