import * as path from 'path';
import * as gulp from 'gulp';
import * as ts from 'gulp-typescript';
import * as sourcemaps from 'gulp-sourcemaps';
var gls = require('gulp-live-server');
var client = require('./config/client.json');

var buildDest = (loc, tsProject) => {
    return gulp.src(path.resolve(loc, '**/*.ts'))
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))
        .js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.resolve(loc)));
}

var serverTS = ts.createProject('tsconfig.json');
var clientTS = ts.createProject('tsconfig.json', client.tsConfig);
var e2eTS    = ts.createProject('tsconfig.json');

gulp.task('build:server', () => {
    return buildDest('server', serverTS);
});

gulp.task('build:client', () => {
    return buildDest('client', clientTS);
});

gulp.task('build:e2e', () => {
    return buildDest('e2e', e2eTS);
});

gulp.task('watch', () => {
    gulp.watch('client/**/*.ts', ['build:client']);
    gulp.watch('server/**/*.ts', ['build:server']);
});

gulp.task('serve', ['watch'], () => {
  var server = gls.new('server/server.js');
  server.start();

  // watch css, html, and js
  gulp.watch([
    'client/**/*.css', 
    'client/**/*.html', 
    'client/**/*.js'
  ], 
  file => {
    console.log("\nChanged: " + file.path);
    console.log("Reloading server\n");
    server.notify.apply(server, [file]);
  });

  // restart server on change
  gulp.watch('server/server.js', server.start.bind(server));

});

gulp.task('default', ['serve']);

