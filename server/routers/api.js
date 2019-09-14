var express = require('express');
var router = express.Router();
var User = require('../db/models/User');
var Blog = require('../db/models/Blog');
var Category = require('../db/models/Category');
//统一范湖格式

var responseData;

/**
 * 前端采用cookies保持登录状态
 */
var httpOnly = { httpOnly: false };


router.use(function (res, req, next) {
    responseData = {
        code: 0,
        msg: ''
    };
    next();
});


/**
 * 后端注册接口
 *
 * 1. 用户名不能为空，且唯一
 * 2. 密码不能为空
 * 3. 两次密码输入要一致
 */
router.post('/user/register', function (req, res, next) {
    var registerType = req.body.type;
    var email = req.body.email;//post body
    var phone = req.body.phone;
    var password = req.body.password;
    var repassword = req.body.repassword;

    if (registerType === 'email' & (!email || email == '')) {
        responseData.code = 1;
        responseData.msg = '邮箱不能为空';
        res.json(responseData);
        return;
    }

    if (registerType === 'phone' && (!phone || phone == '')) {
        responseData.code = 1;
        responseData.msg = '手机号不能为空';
        res.json(responseData);
        return;
    }

    if (password == '') {
        responseData.code = 1;
        responseData.msg = '密码不能为空';
        res.json(responseData);
        return;
    }

    if (password != repassword) {
        responseData.code = 1;
        responseData.msg = '两次输入密码不一致';
        res.json(responseData);
        return;
    }

    //用户名是否被注册
    if (registerType === 'email') {
        User.findOne({ email: email }).then(function (userInfo) {
            if (userInfo) {
                responseData.code = 4;
                responseData.msg = '该邮箱已经被注册';
                //responseData.data=userInfo;
                res.json(responseData);
                return;

            }
            var user = new User({ username: email, email: email, password: password, registerType: registerType });
            user.save().then(function (newUserInfo) {
                responseData.msg = '注册成功';
                delete newUserInfo.password;
                responseData.data = {
                    avatar: newUserInfo.avatar,
                    userId: newUserInfo._id,
                    username: newUserInfo.username,
                    registerType: newUserInfo.registerType,
                    email: newUserInfo.email,
                    isAdmin: newUserInfo.isAdmin
                };
                req.cookies.set('userInfo', JSON.stringify({ _id: newUserInfo._id, username: newUserInfo.username, avatar: newUserInfo.avatar }), httpOnly);
                res.json(responseData);
            });
            //这个then是user.save方法的then
        });
    } else {
        User.findOne({ phone: phone }).then(function (userInfo) {
            if (userInfo) {
                responseData.code = 4;
                responseData.msg = '该手机号已经被注册';
                //responseData.data=userInfo;
                res.json(responseData);
                return;

            }
            var user = new User({ username: phone, phone: phone, password: password, registerType: registerType });
            user.save().then(function (newUserInfo) {
                responseData.msg = '注册成功';
                responseData.data = {
                    avatar: newUserInfo.avatar,
                    userId: newUserInfo._id,
                    username: newUserInfo.username,
                    registerType: newUserInfo.registerType,
                    phone: newUserInfo.phone,
                    isAdmin: newUserInfo.isAdmin
                };
                req.cookies.set('userInfo', JSON.stringify({ _id: newUserInfo._id, username: newUserInfo.username, avatar: newUserInfo.avatar }), httpOnly);
                res.json(responseData);
            });
            //这个then是user.save方法的then
        });

    }

});

/**
 * 后端登录接口
 */
router.post('/user/login', function (req, res, next) {

    var loginType = req.body.type;
    var username = req.body.username;
    var phone = req.body.phone;
    var password = req.body.password;

    if (loginType == 'account' && (username == '' || password == '')) {
        responseData.code = 1;
        responseData.msg = '用户名或者密码不能为空';
        res.json(responseData);
        return;
    }

    if (loginType == 'phone' && (phone == '' || password == '')) {
        responseData.code = 1;
        responseData.msg = '手机号或者密码不能为空';
        res.json(responseData);
        return;
    }

    if (loginType === 'account') {
        User.findOne({ username: username, password: password })
            .then(function (userInfo) {
                if (!userInfo) {
                    responseData.code = 2;
                    responseData.msg = '用户名或者密码错误';
                    res.json(responseData);
                    return;
                }
                responseData.msg = '登录成功';
                responseData.data = {
                    avatar: userInfo.avatar,
                    userId: userInfo._id,
                    username: userInfo.username,
                    registerType: userInfo.registerType,
                    email: userInfo.email,
                    isAdmin: userInfo.isAdmin
                };
                req.cookies.set('userInfo', JSON.stringify({ _id: userInfo._id, username: userInfo.username, avatar: userInfo.avatar }), httpOnly);
                res.json(responseData);
            });
    } else if (loginType === 'phone') {
        User.findOne({ phone: phone, password: password })
            .then(function (userInfo) {
                if (!userInfo) {
                    responseData.code = 2;
                    responseData.msg = '手机号或者密码错误';
                    res.json(responseData);
                    return;
                }
                responseData.msg = '登录成功';
                responseData.data = {
                    avatar: newUserInfo.avatar,
                    userId: userInfo._id,
                    username: userInfo.username,
                    registerType: userInfo.registerType,
                    email: userInfo.email,
                    isAdmin: userInfo.isAdmin
                };
                req.cookies.set('userInfo', JSON.stringify({ _id: userInfo._id, username: userInfo.username, avatar: userInfo.avatar }), httpOnly);
                res.json(responseData);
            });
    }

});

/**
 * 后端登录接口
 */
router.post('/user/loginout', function (req, res, next) {
    req.cookies.set('userInfo', null, httpOnly);
    responseData.msg = '退出成功';
    res.json(responseData)
});

/**
 * 后端添加分类
 */
router.post('/category/add', function (req, res, next) {

    var userInfo = req.userInfo;
    // if (!userInfo) {
    //     responseData.code = 2;
    //     responseData.msg = '登录后才能添加分类';
    //     res.json(responseData);
    //     return;
    // }
    // if (!userInfo.isAdmin) {
    //     responseData.code = 2;
    //     responseData.msg = '只有管理员才能添加分类';
    //     res.json(responseData);
    //     return;
    // }
    var name = req.body.name;
    Category.findOne({ name: name }).
        then(function (categoryInfo) {
            if (categoryInfo) {
                responseData.msg = '该分类已存在';
                res.json(responseData);
                return;
            }
            var category = new Category({
                name: req.body.name
            });

            category.save().then(function (newCategory) {
                responseData.msg = '添加成功';
                responseData.data = newCategory;
                res.json(responseData);
            });
        });
});

/**
 * 后端发表文章
 */
router.post('/blog/publish', function (req, res, next) {

    var userInfo = req.userInfo;
    if (!userInfo) {
        responseData.code = 2;
        responseData.msg = '登录后才能发表文章';
        res.json(responseData);
        return;
    }

    var blog = new Blog({
        userId: userInfo._id,
        title: req.body.title,
        short: req.body.short,
        content: req.body.content,
        face: req.body.face,
        categoryId: req.body.categoryId
    });
    blog.save().then(function (newBlog) {
        responseData.msg = '发表成功';
        responseData.data = {
            blogId: newBlog.id,
            title: newBlog.title
        };
        res.json(responseData);
    });
});

/**
 * 拉取文章列表
 */
router.get('/blog/list', function (req, res, next) {


    var page=Number(req.query.page || 1);
    var limit =Number(req.query.pageSize || 10);
    var skip=(page-1)*limit;
    var pages =0;
    Blog.countDocuments().then(function (count) {
        //计算总页数:向上取整
        pages=Math.ceil(count/limit);
        //取值不能超过总页数pages,不能小于1
        page=Math.min(page,pages);
        page=Math.max(page,1);
        // 读取所有用户
        Blog.find()
            .populate(['userId','categoryId'])
            .limit(limit)
            .skip(skip)
            .then(function (blogs) {
                responseData.msg = '文章列表获取成功';
                responseData.data = {
                    total:count, //总条数
                    pageSize:limit, //每页数
                    pages:pages, //总页数
                    page:page, //当前页
                    list:blogs
                };
                res.json(responseData);
            });
    });

});




router.get('/user/text', function (req, res, next) {
    req.cookies.set('userInfo', JSON.stringify({ aa: 88 }), httpOnly);
    responseData.msg = 'test';
    res.json(responseData)
});

module.exports = router;
