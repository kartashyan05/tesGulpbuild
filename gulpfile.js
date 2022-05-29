//Полючение модулей
const gulp = require('gulp')
const less = require('gulp-less')
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')

const del = require('del')


//Пути к изначальным файлам и файлам назначения
const paths = { //36:22
   styles: {
      src: 'src/styles/**/*.less', //здесь ведется разрзботка
      dest: 'dist/css' //Сюда перемещается конечный результат
   },
   scripts: {
      src: 'src/scripts/**/*.js',
      dest: 'dist/js'
   }
}

//Очистка каталогов
function clean() {
   return del(['dist'])
}

//43:55 Задача для обработки сцриптов
function styles() {
   return gulp.src(paths.styles.src)
      .pipe(less())
      .pipe(cleanCSS()) //52:15
      .pipe(rename({
         basename: 'main',
         suffix: 'min'
      })) //52:45
      .pipe(gulp.dest(paths.styles.dest))
}

//Задача для обработки сцриптов 1:04:00
function scripts() {
   return gulp.src(paths.scripts.src, {
      sourcemaps: true
   })
      .pipe(babel())
      .pipe(uglify())
      .pipe(concat('main.min.js')) //1:08:06
      .pipe(gulp.dest(paths.scripts.dest))
}

//55:25
function watch() {
   gulp.watch(paths.styles.src, styles)
   gulp.watch(paths.scripts.src, scripts)
}

const build = gulp.series(clean, gulp.parallel(styles, scripts), watch) //59:14

exports.clean = clean
exports.styles = styles
exports.scripts = scripts
exports.watch = watch //56:15 экспортируем задачу watch и укж назв функции
exports.build = build
exports.default = build //1:01:29