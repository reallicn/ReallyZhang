

var express = require('express');
var mongoose = require('mongoose');
var swig = require('swig');

var bodyParser= require('body-parser');

var app = express();


app.use(bodyParser.urlencoded({extended:true}));

/**
 * html 模板文件引擎名称以及后缀
 */
app.engine('html', swig.renderFile);
//设置模板文件存放目录
app.set('views','./client/dist');
app.set('view engine','html');
//开发过程中，需要取消模板缓存
swig.setDefaults({ cache: false });




/**
 * 前台模块
 * 后台管理模块
 * API ajax请求模块
 */

//app.use('/public',require('./routers/admin'));
app.use('/api',require('./server/routers/api'));
//app.use('/',require('./routers/main'));
/**
 * 静态资源托管
 */
app.use('/main',require('./server/routers/main'));
app.use('/',express.static(__dirname+'/client/dist'));




// /**
//  * 首页
//  */
// app.get('/',function (req,res,next) {
//     res.render('index');
// });
// 使用静态文件托管 public
// app.get('/main.css',function (req,res,next) {
//
//     res.setHeader('content-type','text/css');
//     res.send('body{}')
//
// });




var ret = mongoose.connect('mongodb://localhost:27017/blog_db',{useNewUrlParser:true},function (err) {
    if(err){
        console.log('数据库连接失败');
    }else{
        console.log('数据库连接成功,项目启动');
        app.listen(8099,function (err) {
            if(err){
                console.log('启动失败，详情请查看log信息');
            }else{
                console.log('启动成功，在浏览器输入 http://localhost:8099')
            }
        });
    }
});

