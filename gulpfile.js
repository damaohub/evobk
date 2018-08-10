var gulp = require('gulp');
var concat = require('gulp-concat');
var header = require('gulp-header');
var connect = require("gulp-connect");
var less = require("gulp-less");
var autoprefixer = require('gulp-autoprefixer');
var ejs = require("gulp-ejs");
var uglify = require('gulp-uglify');
var ext_replace = require('gulp-ext-replace');
var cssmin = require('gulp-cssmin');

var pkg = require("./package.json");

var banner = 
"/** \n\
* ProjectName V" + pkg.version + " \n\
* By mao\n\
* http://damaohub.github.io/evo/\n \
*/\n";

gulp.task('js', function() {
  gulp.src([
    './src/js/app.js'
  ])
    .pipe(concat({ path: 'app.js' }))
    .pipe(header(banner))
    .pipe(gulp.dest('./dist/js/'))
  });

gulp.task('uglify',["js"], function() {
 gulp.src(['./dist/js/*.js', '!./dist/js/*.min.js'])
    .pipe(uglify())
    .pipe(ext_replace('.min.js'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('less', function () {
  gulp.src(['./src/less/app.less'])
  .pipe(less())
  .pipe(autoprefixer())
  .pipe(header(banner))
  .pipe(gulp.dest('./dist/css/'));

});

gulp.task('cssmin', ["less"], function () {
  gulp.src(['./dist/css/*.css', '!./dist/css/*.min.css'])
    .pipe(cssmin())
    .pipe(header(banner))
    .pipe(ext_replace('.min.css'))
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('ejs', function () {
  return gulp.src(["./src/pages/*.html", "!./src/pages/_*.html"])
    .pipe(ejs({}))
    .pipe(gulp.dest("./dist/pages/"));
});

gulp.task('copy', function() {
   gulp.src(['src/js/clipboard.min.js'])
     .pipe(gulp.dest('./dist/js/'));

  gulp.src(['src/icons/*.*'])
      .pipe(gulp.dest('./dist/icons/'));

});

gulp.task('watch', function () {
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/less/**/*.less', ['less']);
  gulp.watch('src/pages/*.html', ['ejs']);
  gulp.watch('src/pages/css/*.css', ['copy']);
});

gulp.task('server', function () {
  connect.server();
});
gulp.task("default", ['watch', 'server']);
gulp.task("build", ['uglify','cssmin', 'copy', 'ejs']);
