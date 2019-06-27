const { watch, src, dest } = require('gulp');
const scss = require('gulp-sass');

scss.compiler = require('node-sass');

const convertCSSToSCSS = () => {
    return src('./scss/*.scss')
    .pipe(scss())
    .pipe(dest('./css'))
}


watch('scss/**.scss', convertCSSToSCSS);
exports.default =  convertCSSToSCSS;