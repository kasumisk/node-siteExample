/**
 * Created by Administrator on 2015/7/24.
 */
var gulp = require("gulp");
var nodemon = require("gulp-nodemon");
var livereload = require("gulp-livereload");
//nodemon
gulp.task('develop', function () {
    livereload.listen();
    nodemon({
        script: 'bin/www',
        ext: 'js jade'
    }).on('restart', function () {
        setTimeout(function () {
            livereload.changed();
        }, 500);
    });
});

gulp.task('default', [
    'develop'
]);
