const gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cleanCss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    gcmq = require('gulp-group-css-media-queries');

const config = {
    src: './src',
    dest: 'distr',
    css: {
        src: '/precss/**/*.scss',
        dest: '/css'
    },
    buildCss: {
        src: '/css/**/*.css',
        dest: '/css'
    },
    libs: {
        src: '/libs/**/*.*',
        dest: '/libs'
    },
    img: {
        src: '/images/**/*.*',
        dest: '/images'
    },
    js: {
        src: '/js/**/*.*',
        dest: '/js'
    },
    fonts: {
        src: '/fonts/**/*.*',
        dest: '/fonts'
    },
    html: {
        src: '/*.html',
    }
}


gulp.task('precss', function () {
    return gulp.src(config.src + config.css.src)
        .pipe(sass())
        .pipe(gulp.dest(config.src + config.css.dest))
        .pipe(browserSync.reload({
            stream: true
        }))
});
gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'src'
        },
        notify: false
    });
});

gulp.task('libs', function () {
    return gulp.src(config.src + config.libs.src)
        .pipe(gulp.dest(config.dest + config.libs.dest));
});

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch(config.src + config.css.src, ['precss']);
    gulp.watch(config.src + config.html.src, browserSync.reload);
    gulp.watch(config.src + config.js.src, browserSync.reload);
});
gulp.task('clean', function () {
    return del.sync(config.dest);
});
gulp.task('img', function () {
    return gulp.src(config.src + config.img.src)
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
                }],
            use: [pngquant()]
        })))
        .pipe(gulp.dest(config.dest + config.img.dest));
});

gulp.task('buildCss', function () {
    return gulp.src(config.src + config.buildCss.src)
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
            cascade: false
        }))
        .pipe(gcmq())
        .pipe(cleanCss())
        //        .pipe(rename({
        //            suffix: '.min'
        //        }))
        .pipe(gulp.dest(config.dest + config.buildCss.dest));
});

gulp.task('buildJs', function () {
    return gulp.src(config.src + config.js.src)
        .pipe(gulp.dest(config.dest + config.js.dest));
});

gulp.task('buildFonts', function () {
    return gulp.src(config.src + config.fonts.src)
        .pipe(gulp.dest(config.dest + config.fonts.dest));
});
gulp.task('buildHtml', function () {
    return gulp.src(config.src + config.html.src)
        .pipe(gulp.dest(config.dest));
});




gulp.task('build', ['clean', 'buildHtml', 'buildCss', 'img', 'buildJs', 'buildFonts', 'libs']);

gulp.task('default', ['watch']);
