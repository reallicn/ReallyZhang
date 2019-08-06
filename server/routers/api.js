var express = require('express');
var router =express.Router();
var User = require('../db/models/User');

//统一范湖格式

var responseData;


router.use(function (res,req,next) {
    responseData={
        code:0,
        msg:''
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
router.post('/user/register',function (req,res,next) {
    console.log('registerData',req.body);
    var registerType = req.body.type;
    var email= req.body.email;//post body
    var phone= req.body.phone;
    var password= req.body.password;
    var repassword= req.body.repassword;

    if(registerType==='email'&(!email||email == '')){
        responseData.code=1;
        responseData.msg='邮箱不能为空';
        res.json(responseData);
        return;
    }

    if(registerType==='phone'&&(!phone||phone == '')){
        responseData.code=1;
        responseData.msg='手机号不能为空';
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
    if(registerType==='email'){
        User.findOne({email:email}).then(function (userInfo){
            if(userInfo){
                responseData.code=4;
                responseData.msg='该邮箱已经被注册';
                //responseData.data=userInfo;
                res.json(responseData);
                return;
    
            }
            var user = new User({username:email,email:email,password:password,registerType:registerType});
            user.save().then(function (newUserInfo) {
                responseData.msg='注册成功';
                delete newUserInfo.password;
                responseData.data={
                    userId:newUserInfo._id,
                    username:newUserInfo.username,
                    registerType:newUserInfo.registerType,
                    email:newUserInfo.email,
                    isAdmin:newUserInfo.isAdmin
                };
                req.cookies.set('userInfo',JSON.stringify({_id:userInfo._id,username:userInfo.username}));
                res.json(responseData);
            });
            //这个then是user.save方法的then
        });
    }else{
        User.findOne({phone:phone}).then(function (userInfo){
            if(userInfo){
                responseData.code=4;
                responseData.msg='该手机号已经被注册';
                //responseData.data=userInfo;
                res.json(responseData);
                return;
    
            }
            var user = new User({username:phone,phone:phone,password:password,registerType:registerType});
            user.save().then(function (newUserInfo) {
                responseData.msg='注册成功';
                responseData.data={
                    userId:newUserInfo._id,
                    username:newUserInfo.username,
                    registerType:newUserInfo.registerType,
                    phone:newUserInfo.phone,
                    isAdmin:newUserInfo.isAdmin
                };
                req.cookies.set('userInfo',JSON.stringify({_id:userInfo._id,username:userInfo.username}));
                res.json(responseData);
            });
            //这个then是user.save方法的then
        });

    }
    
});

/**
 * 后端登录接口
 */
router.post('/user/login',function (req,res,next) {

    var loginType = req.body.type;
    var  username= req.body.username;
    var  phone= req.body.phone;
    var password= req.body.password;

    if(loginType=='account'&&(username==''||password=='')){
        responseData.code=1;
        responseData.msg='用户名或者密码不能为空';
        res.json(responseData);
        return;
    }

    if(loginType=='phone'&&(phone==''||password=='')){
        responseData.code=1;
        responseData.msg='手机号或者密码不能为空';
        res.json(responseData);
        return;
    }

    if(loginType === 'account'){
        User.findOne({username:username,password:password})
        .then(function (userInfo) {
            if(!userInfo){
                responseData.code=2;
                responseData.msg='用户名或者密码错误';
                res.json(responseData);
                return;
            }
            responseData.msg='登录成功';
            responseData.data={
                userId:userInfo._id,
                username:userInfo.username,
                registerType:userInfo.registerType,
                email:userInfo.email,
                isAdmin:userInfo.isAdmin
            };
            req.cookies.set('userInfo',JSON.stringify({_id:userInfo._id,username:userInfo.username}));
            res.json(responseData);
        });
    }else if(loginType === 'phone'){
        User.findOne({phone:phone,password:password})
        .then(function (userInfo) {
            if(!userInfo){
                responseData.code=2;
                responseData.msg='手机号或者密码错误';
                res.json(responseData);
                return;
            }
            responseData.msg='登录成功';
            responseData.data={
                userId:userInfo._id,
                username:userInfo.username,
                registerType:userInfo.registerType,
                email:userInfo.email,
                isAdmin:userInfo.isAdmin
            };
            req.cookies.set('userInfo',JSON.stringify({_id:userInfo._id,username:userInfo.username}));
            res.json(responseData);
        });
    }

});

router.get('/user/text',function (req,res,next) {
    req.cookies.set('userInfo',JSON.stringify({aa:88}));
    responseData.msg='test';
    res.json(responseData)
});

/**
 * 后端登录接口
 */
router.post('/user/loginout',function (req,res,next) {
    req.cookies.set('userInfo',null);
    responseData.msg='退出成功';
    res.json(responseData)
});



module.exports = router;
