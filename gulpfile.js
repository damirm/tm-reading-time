var gulp = require('gulp');

var paths = {
    dev: {
        js: ['./src/*.js'],
        icons: ['./src/icons/*']
    },
    build: {
        chrome: './build/chrome'
    },
    dist: {
        chrome: './dist/chrome'
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

gulp.task('watch', ['chrome'], function () {
    gulp.watch('./src/**/*', ['chrome']);
});

gulp.task('default', ['watch']);