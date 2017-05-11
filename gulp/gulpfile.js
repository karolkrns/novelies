
/**
 * Configs
 */

var viewsFolder         = '../';

var config = {

    sass: viewsFolder + 'scss/**/*.{scss,sass}',
    sassFolder: viewsFolder + 'scss/',
    css: viewsFolder + 'css',

    jsFiles: viewsFolder + 'js/**/*.js',
    js: viewsFolder + 'js/',

    imageFiles: viewsFolder + 'img/**/*.{png,gif,jpeg,jpg,svg}',
    image: viewsFolder + 'img',

    sprites: viewsFolder + 'img/sprites/**/*.png',

    templates: viewsFolder + '/**/*.{tpl,html}'

};

/**
 * Gulp
 */

var gulp        = require('gulp');

/**
 * Include Plugins
 */

var sass        = require('gulp-sass');
var pleeease    = require('gulp-pleeease');

// var concat      = require('gulp-concat');
// var rename      = require('gulp-rename');
var plumber     = require('gulp-plumber');
// var gulpif      = require('gulp-if');


/**
 * Images Manipulation
 */

var spritesmith  = require('gulp.spritesmith');

/**
 * Notifications
 */

var notify = require('gulp-notify');

/**
 * Plumber | Error handling
 */

var onError = function (err) {
    console.log(err);
};


/**
 * Sass, CSS, Compilation, Autoprefixing
 */

var PleeeaseOptions = {
    optimizers: {
        minifier: true,
        autoprefixer: true,
        pseudoElements: true,
        import: true,
        mqpacker: true,
        next: false
    }
};

gulp.task('sass', function () {
    gulp.src( config.sass )

        .pipe(plumber())
        .pipe(sass({
            errLogToConsole: true,
            onError: function(err) {
                return notify().write(err);
            }
        }))
        .pipe(pleeease(PleeeaseOptions))
        .pipe(gulp.dest( config.css ))

        .pipe(notify({
            "message": "Great success",
            "title": "Sass compiled"
        }))

});

/**
 * Sass, CSS, Compilation, Autoprefixing
 */

gulp.task('images', function () {
    return gulp.src( config.imageFiles )
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest( config.image ));
});

/**
 * Sprite icons generation
 */

gulp.task('sprite', function() {
   var spriteData =
   gulp.src( config.sprites ) // source path of the sprite images
   .pipe(spritesmith({
       imgName: '../img/sprite.png',
       cssName: '_sprites.css',
       algorithm: 'left-right'
   }));
   spriteData.img.pipe(gulp.dest(config.image)); // outpu the sprite
   spriteData.css.pipe(gulp.dest(config.sassFolder + 'partials')); // output path for the CSS
});

/**
 * Default Task
 */

gulp.task('default', ['sass'], function () {
    gulp.watch( config.sass , ['sass']);
});
