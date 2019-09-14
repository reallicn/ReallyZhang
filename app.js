var express = require('express');
var mongoose = require('mongoose');
var swig = require('swig');
var Cookies = require('cookies');
var bodyParser = require('body-parser');

var app = express();
var User = require('./server/db/models/User');



/**
 * html 模板文件引擎名称以及后缀
 */
app.engine('html', swig.renderFile);
//设置模板文件存放目录
app.set('views', './client/dist');
app.set('view engine', 'html');
//开发过程中，需要取消模板缓存
swig.setDefaults({ cache: false });

// bodyparwer设置
app.use(bodyParser.urlencoded({ extended: true }));
//设置cookies
app.use(function (req, res, next) {
    req.cookies = new Cookies(req, res);
    //解析用户登录信息
    req.userInfo = null; 
    var cookieUserInfo = req.cookies.get('userInfo');
    if (cookieUserInfo) {
        try {
            req.userInfo = JSON.parse(cookieUserInfo);
            //获取当前登录用户类型，是否是管理员
            User.findById(req.userInfo._id).then(function (userInfo) {
                if (userInfo) {
                    req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                }
            });
        } catch (e) {
            console.log('cookies出错了：',e);
        }
    }
    next();
});



/**
 * 前台模块
 * 后台管理模块
 * API ajax请求模块
 */
/**
 * ajax请求
 */
app.use('/api', require('./server/routers/api'));

/**
 * 后台管理
 */
app.use('/admin', require('./server/routers/admin'));

/**
 * 前台页面
 */
app.use('/page', require('./server/routers/page'));
/**
 * 静态资源托管
 */
app.use('/', express.static(__dirname + '/client/dist'));





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




var ret = mongoose.connect('mongodb://localhost:27017/blog_db', { useNewUrlParser: true }, function (err) {
    if (err) {
        console.log('数据库连接失败');
    } else {
        console.log('数据库连接成功,项目启动');
        app.listen(8099, function (err) {
            if (err) {
                console.log('启动失败，详情请查看log信息');
            } else {
                console.log('后台服务启动成功，api 访问地址为 http://localhost:8099')
            }
        });
    }
});

