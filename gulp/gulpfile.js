const gulp = require('gulp');
const fs = require('fs');
const through = require('through2');
var stream = require('stream').Transform;

class ThroughStream extends stream {
  constructor(options) {
    super(options);
  }

  _transform(chunk, enc, cb) {
    // console.log(enc);
    // this.push();
    cb(null, chunk);
  }
}

function gulpPrefixer(options) {
  let s = new ThroughStream({ objectMode: true });
  return s;
}

gulp.task('default', () => {
  gulp.src('./src/*.js', {buffer: true})
  .pipe(gulpPrefixer())
  .pipe(gulp.dest('./dest/'));
})
