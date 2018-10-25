const gulp = require("gulp");

gulp.task("copyHtml",function(){
	gulp.src("src/html/*")
	.pipe(gulp.dest("dist/html"))
})

gulp.task("copyImg",function(){
	gulp.src("src/img/*").pipe(gulp.dest("dist/img"));
})

gulp.task("copyJs",function(){
	gulp.src("src/js/**/*").pipe(gulp.dest("dist/js/"));
})

gulp.task("copyCss",function(){
	gulp.src("src/css/**/*").pipe(gulp.dest("dist/css/"));
})

gulp.task("copyfile",function(){
	gulp.src("src/**/*").pipe(gulp.dest("dist/"))
})

// 图片压缩
const imgMin = require("gulp-imagemin");
gulp.task("imgMin",function(){
	//现在管道中进行压缩
	gulp.src("src/img/**/*").pipe(imgMin()).pipe(gulp.dest("dist/img"));
})

// 压缩js,被压缩的js代码中不能有es6语法存在
var jsMin = require("gulp-uglify");
gulp.task("jsMin",function(){
	gulp.src("src/js/{jquery-1.11.3,tool}.js")
	.pipe(jsMin())
	.pipe(gulp.dest("dist/js"))
})

//sass转css
var sass = require("gulp-sass-china");
gulp.task("sass",function(){
	gulp.src("src/sass/*")
	.pipe(sass({
		// css的输出样式
		outputStyle:"nested"
	}))
	.pipe(gulp.dest("dist/"));
})


// 监听
gulp.task("scss",function(){
	// 当src/sass的文件发生变化后，就执行sass任务
	gulp.watch("src/sass/*.{scss,sass}",["sass"]);
})

// 创建本地服务器
var connect = require("gulp-connect");
gulp.task("server",function(){
	connect.server({
		root:"src",
		port:8888,
		livereload:true
	})
})

// 实现自动刷新
// server+watch	注意服务器和监听只能存在一个
// 因此需要把刷新和服务器开启分为2部分
gulp.task("server-watch",function(){
	// 监听文件的变化
	gulp.watch("src/**/*",function(){
		//如果文件发生了变化，那么服务器就会重载
		gulp.src("src/**/*")
		.pipe(connect.reload())
	})
})	

// 开启了三个服务，创建一个服务器，文件改变服务器就刷新，监听scss文件的变化并转化
gulp.task("server-task",["server","server-watch","scss"]);

// 正向代理
let proxy = require("http-proxy-middleware");
gulp.task("connect",function(){
	connect.server({
		root:"src",
		port:9999,
		livereload:true,
		middleware:function(){
			return [
			proxy("/OfficialSiteAPI.asmx",{
				target:"https://www.asus.com.cn",
				changeOrigin:true
			}),
			proxy("/search",{
				target:"https://search.gome.com.cn",
				changeOrigin:true
			}),
			proxy("/ajax",{
				target:"http://shop.mogujie.com",
				changeOrigin:true
			})
			]
		}
	})
})


