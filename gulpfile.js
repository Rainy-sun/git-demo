


// 在gulpfile中先载入
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
// 1.less 编译 压缩 合并
gulp.task('style',function(){
	//这里是在执行style任务时自动执行
	gulp.src(['src/styles/*.less','!src/styles/_*.less'])
	.pipe(less())//将less转换为css
	.pipe(cssnano())//压缩css文件
	.pipe(gulp.dest('dist/styles'))
	.pipe(browserSync.reload({
      stream: true
    }));
});
//JS 合并 压缩 混淆
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
gulp.task('script',function(){
	gulp.src('src/scripts/*.js')
	.pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/scripts'))
	.pipe(browserSync.reload({
      stream: true
    }));
});
//img 复制
 gulp.task('images',function(){
 	gulp.src('src/images/*.*')
 	.pipe(gulp.dest('dist/images'))
 	.pipe(browserSync.reload({
      stream: true
    }));
 });
//html 压缩
 var htmlmin = require('gulp-htmlmin');
 gulp.task('htmlmin',function(){
  	gulp.src('src/*.html')
  	.pipe(htmlmin({
  	 collapseWhitespace: true,
       removeComments: true	
  	}))
  	.pipe(gulp.dest('dist'))

  	.pipe(browserSync.reload({
       stream: true
     }));

  });
 // var browserSync = require('browser-Sync');
 // gulp.task('serve',function(){

 // })








var browserSync = require('browser-Sync');
gulp.task('serve', function(){
  browserSync({
    server: {
      baseDir: ['dist']
    },
  }, function(err, bs) {
    console.log(bs.options.getIn(["urls", "local"]));
  });

  gulp.watch('src/styles/*.less',['style']);
  gulp.watch('src/scripts/*.js',['script']);
  gulp.watch('src/images/*.*',['image']);
  gulp.watch('src/*.html',['htmlmin']);
});