var gulp = require('gulp'),
    zip = require('gulp-zip');

var paths = {
    dev: {
        js: ['./src/*.js'],
        icons: ['./src/icons/*']
    },
    build: {
        chrome: './build/chrome'
    },
    dist: {
        chrome: './dist'
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

gulp.task('chrome:dist', ['chrome'], function () {
    gulp.src(paths.build.chrome + '/**/*')
        .pipe(zip('chrome.zip'))
        .pipe(gulp.dest(paths.dist.chrome));
});

gulp.task('watch', ['chrome'], function () {
    gulp.watch('./src/**/*', ['chrome']);
});

gulp.task('default', ['watch']);