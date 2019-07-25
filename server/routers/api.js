var express = require('express');
var router =express.Router();
var User = require('../models/User');

//统一范湖格式

var responseData;


router.use(function (res,req,next) {
    responseData={
        code:0,
        msg:''
    }
    next();
});


/**
 * 后端注册接口
 * 
 * 1. 用户名不能为空，且唯一
 * 2. 密码不能为空
 * 3. 两次密码输入要一致
 */
router.get('/user/register',function (req,res,next) {
    console.log('register',req.query);

    var username= req.query.username;//post body
    var password= req.query.password;
    var repassword= req.query.repassword;

    if(username == ''){
        responseData.code=1;
        responseData.msg='用户名不能为空';
        res.json(responseData);
        return;
    }

    if(password == ''){
        responseData.code=1;
        responseData.msg='密码不能为空';
        res.json(responseData);
        return;
    }

    if(password != repassword){
        responseData.code=1;
        responseData.msg='两次输入密码不一致';
        res.json(responseData);
        return;
    }

    //用户名是否被注册
    User.findOne({username:username}).then(function (userInfo){
        if(userInfo){
            responseData.code=4;
            responseData.message='用户名已经被注册';
            responseData.data=userInfo;
            res.json(responseData);
            return;

        }
        var user = new User({username:username,password:password});
        user.save().then(function (newUserInfo) {
            responseData.msg='注册成功';
            responseData.data=newUserInfo;
            res.json(responseData);
        });
        //这个then是user.save方法的then
    });
});


module.exports = router;
