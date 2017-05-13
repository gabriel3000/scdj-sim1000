var gulp = require("gulp"),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps');
	gutil = require('gulp-util'),
    webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
	webpackConfig = require('./webpack.config.js'),
    stream = require('webpack-stream');

var path = {
    HTML: 'src/index.html',
    ALL: ['src/**/*.jsx', 'src/**/*.js', 'src/sass/**/*.scss'],
    MINIFIED_OUT: 'build.min.js',
    DEST_BUILD: 'dist/build',
    DEST: 'dist'
};


gulp.task('webpack', [], function() {
    // modify some webpack config options
    return gulp.src(path.ALL) //gulp looks for all source files under specified path
        .pipe(sourcemaps.init()) // creates a source map wich would be very helpful for debugging by maintaining actual source code structure
        .pipe(stream(webpackConfig)) // blend in webpack config into the source files
        .pipe(uglify()) //minifies the code for better compression
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.DEST_BUILD));
});


gulp.task("webpack-dev-server", function(callback) {
    // Start a webpack-dev-server
    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = "eval";
    //myConfig.debug = true;

    new WebpackDevServer(webpack(myConfig), {
        publicPath: '/' + myConfig.output.publicPath,
        stats: {
            colors: true
        },
    }).listen(8080, 'localhost', function(err) {
        if(err) throw new gutil.PluginError('webpack-dev-server', err);
        gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
    });
});

gulp.task('sass', function () {
  return gulp.src('./src/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/build'));
});

gulp.task('watch',function() {
    gulp.watch(path.ALL, ['webpack','sass']);
});

gulp.task('default', ['webpack-dev-server', 'watch', 'sass']);