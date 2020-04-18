// Import dependencies
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync');
const cssnano = require('cssnano');
const del = require('del');

// Import Gulp utilities and dependencies
const { src, dest, watch, series, parallel } = require('gulp');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const zip = require('gulp-zip');

const pkg = require('./package.json');

// Define variables

const { version } = pkg;
const isDev = process.env.NODE_ENV !== 'production';
const server = browserSync.create();
const clean = () => del(['dist/*.js', 'dist/lang/*', 'dist/css/*']);
const cleanMin = () => del(['distMin/*.js', 'distMin/css/*']);

// File paths

const paths = {
  styles: {
    src: 'src/scss/**/*.scss',
    dest: 'dist/css',
    destMin: 'distMin/css',
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist',
    destMin: 'distMin',
  },
  html: 'src/*.html',
};

// Style tasks

function styles() {
  // Dev
  if (isDev) {
    return src(paths.styles.src)
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(postcss([autoprefixer()]))
      .pipe(sourcemaps.write('.'))
      .pipe(dest(paths.styles.dest))
      .pipe(browserSync.stream());
  }

  // Prod
  return src(paths.styles.src)
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(dest(paths.styles.dest));
}

// Same as above but minified for production in a separate task
function stylesMin() {
  return src(paths.styles.src)
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest(paths.styles.destMin));
}


// JavaScript tasks

function scripts() {
  if (isDev) {
    return src(paths.scripts.src, { sourcemaps: true })
      .pipe(dest(paths.scripts.dest))
      .pipe(browserSync.stream());
  }

  return src(paths.scripts.src, { sourcemaps: false })
    .pipe(dest(paths.scripts.dest));
}

// Same as above but minified for production in a separate task
function scriptsMin() {
  return src(paths.scripts.src, { sourcemaps: false })
    .pipe(uglify())
    .pipe(dest(paths.scripts.destMin));
}

// Copy files

function copyHtml() {
  return src(paths.html)
    .pipe(dest('dist'));
}

// Make release

function release() {
  return src(['dist/css/**/*', 'dist/lang/**/*', 'dist/*.js'], {
    base: 'dist',
  })
    .pipe(zip(`tarteaucitron.js-${version}.zip`))
    .pipe(dest('releases'));
}

// BrowserSync

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: 'dist',
      index: 'index.html',
    },
  });
  done();
}

// Watcher

function watchTask() {
  watch([paths.styles.src, paths.scripts.src, paths.html],
    series(parallel(styles, scripts, reload)));
}

// Export Gulp tasks

exports.copyHtml = copyHtml;
exports.styles = styles;
exports.scripts = scripts;
exports.stylesMin = stylesMin;
exports.scriptsMin = scriptsMin;
exports.release = release;
exports.clean = clean;

exports.default = series(
  parallel(styles, scripts, serve),
  watchTask,
);

exports.build = series(
  clean,
  parallel(styles, scripts, copyHtml),
);

exports.buildMinified = series(
  cleanMin,
  parallel(stylesMin, scriptsMin),
);
