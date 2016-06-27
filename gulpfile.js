'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var tsproject = require('tsproject');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var https = require('https');
var fs = require('fs');

var config = require('./config.json');

gulp.task('clean', function () {
  return gulp.src('dist', { read: false })
    .pipe(clean());
});

gulp.task('compile', ['clean'], function () {
  return tsproject.src('./tsconfig.json')
    .pipe(gulp.dest('dist'));
});

gulp.task('upload-sim', ['compile'], function () {
  var screeps = {
    email: config.email,
    password: config.password,
    data: {
      branch: 'default',
      modules: {
        main: fs.readFileSync('./dist/main.js', { encoding: "utf8" }),
      }
    }
  };

  var req = https.request({
    hostname: 'screeps.com',
    port: 443,
    path: '/api/user/code',
    method: 'POST',
    auth: screeps.email + ':' + screeps.password,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  }, function (res) {
    gutil.log('Build ' + gutil.colors.cyan('completed') + ' with HTTPS response ' + gutil.colors.magenta(res.statusCode));
  });

  req.write(JSON.stringify(screeps.data));
  req.end();
});

gulp.task('watch', function () {
  gulp.watch('./src/**/*.ts', ['compile']);
});

gulp.task('build', ['upload-sim']);

gulp.task('default', ['watch']);
