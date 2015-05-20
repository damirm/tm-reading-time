var gulp = require('gulp'),
    zip = require('gulp-zip'),
    run = require('gulp-run');

var paths = {
    dev: {
        js: ['./src/*.js'],
        icons: ['./src/icons/*']
    },
    build: {
        chrome: './build/chrome',
        firefox: './build/firefox'
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
        .pipe(gulp.dest(paths.build.chrome));
});

gulp.task('firefox', function () {
    gulp.src(paths.dev.js)
        .pipe(gulp.dest(paths.build.firefox + '/data/js'));

    gulp.src(paths.dev.icons)
        .pipe(gulp.dest(paths.build.firefox + '/data/icons'));

    gulp.src('./src/firefox/*')
        .pipe(gulp.dest(paths.build.firefox));
});

gulp.task('chrome:dist', ['chrome'], function () {
    gulp.src(paths.build.chrome + '/**/*')
        .pipe(zip('chrome.zip'))
        .pipe(gulp.dest(paths.dist.chrome));
});

gulp.task('firefox:dist', ['firefox'], function (cb) {
    run('cd ./build/firefox && cfx xpi --output-file=../../dist/firefox.xpi').exec(cb);
});


gulp.task('watch', ['chrome', 'firefox'], function () {
    gulp.watch('./src/**/*', ['chrome']);
});

gulp.task('default', ['watch']);