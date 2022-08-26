

const {src, dest, watch, series, parallel} = require('gulp');

//CSS y sass
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

//imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done){
    //compiar sass

    // 1 - Identificar archivo
    // 2 - Compilarla
    // 3 - Guardar el .css compilado

    src('src/scss/app.scss')
        .pipe( sourcemaps.init() )
        .pipe(sass(/*{outputStyle: 'compressed'}*/) )
        .pipe( postcss( [ autoprefixer(), cssnano() ] ) )
        .pipe( sourcemaps.write('.') )
        .pipe( dest('build/css') )

    done();
}

function imagenes(){
    return src('src/img/**/*')
            .pipe( imagemin({optimizationLevel: 3}) )
            .pipe( dest('build/img') );

}

function versionWebp(){
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
            .pipe( webp(opciones) )
            .pipe( dest('./build/img') )
}

function versionAvif(){
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
            .pipe( avif( opciones ) )
            .pipe( dest('./build/img') )
}

function dev_watch () {
    
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes)
}



exports.css = css;
exports.dev_watch = dev_watch;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series(imagenes, versionWebp, versionAvif, css, dev_watch);
// exports.default = parallel( css, dev);

//Series --> eejcuta 1 tarea, una vez completada va a la siguiente tarea
//Parallel --> se ejecutan simultaneamemnte