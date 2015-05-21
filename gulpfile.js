var gulp = require('gulp'),
    zip = require('gulp-zip'),
    run = require('gulp-run'),
    config = require('./config'),
    preprocess = require('gulp-preprocess'),
    path = require('path'),
    del = require('del');

var buildDir = './build';
var paths = {
    dev: {
        js: ['./src/*.js'],
        icons: ['./src/icons/*']
    },
    build: {
        chrome: buildDir + '/chrome',
        firefox: buildDir + '/firefox'
    },
    dist: {
        chrome: './dist',
        firefox: './dist'
    }
};

gulp.task('chrome', function () {
    gulp.src(paths.dev.js)
        .pipe(gulp.dest(paths.build.chrome + '/js'));

    gulp.src(paths.dev.icons)
        .pipe(gulp.dest(paths.build.chrome + '/icons'));

    gulp.src('./src/chrome/*')
        .pipe(preprocess({ context: config }))
        .pipe(gulp.dest(paths.build.chrome));
});

gulp.task('firefox', function () {
    gulp.src(paths.dev.js)
        .pipe(gulp.dest(paths.build.firefox + '/data/js'));

    gulp.src(paths.dev.icons)
        .pipe(gulp.dest(paths.build.firefox + '/data/icons'));

    gulp.src('./src/firefox/*')
        .pipe(preprocess({ context: config }))
        .pipe(gulp.dest(paths.build.firefox));
});

gulp.task('chrome:_crx', ['chrome'], function (cb) {
    run("/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome " +
        ' --pack-extension=' + path.join(__dirname, paths.build.chrome) +
        ' --pack-extension-key=' + path.join(process.env.HOME, '.ssh/chrome/chrome-tm-reading-time.pem'))
        .exec(cb);
});

gulp.task('chrome:dist', ['chrome:_crx'], function (cb) {
    gulp.src(paths.build.chrome + '.crx')
        .pipe(gulp.dest(paths.dist.chrome));
});

gulp.task('firefox:dist', ['firefox'], function (cb) {
    run('cd ./build/firefox && cfx xpi --output-file=../../dist/firefox.xpi').exec(cb);
});

gulp.task('clean:build', function () {
    del(buildDir);
});

gulp.task('clean:dist', function () {
    del(paths.dist.chrome);
});

gulp.task('dist', ['chrome:dist', 'firefox:dist']);

gulp.task('watch', ['chrome', 'firefox'], function () {
    gulp.watch('./src/**/*', ['chrome']);
});

gulp.task('default', ['watch']);