var express = require('express');


var router =express.Router();

var User = require('../db/models/User');
var Category = require('../db/models/Category');

router.use(function(req,res,next){
    if(!req.userInfo.isAdmin){
        res.send("只有管理员才可以进入后台管理");
        return;
    }
    next();
});


/**
 *
 */
router.get('/',function (req,res,next) {

    res.render('admin/index',{
        userInfo:req.userInfo
    });
});


/**
 * 用户管理,分页展示
 * limit()
 * skip() 忽略前几条
 */


router.get('/user',function (req,res,next) {

    var page=Number(req.query.page || 1);
    var limit =10;
    var skip=(page-1)*limit;
    var pages =0;
    User.count().then(function (count) {
        //计算总页数:向上取整
        pages=Math.ceil(count/limit);
        //取值不能超过总页数pages,不能小于1
        page=Math.min(page,pages);
        page=Math.max(page,1);
        // 读取所有用户
        User.find().limit(limit).skip(skip).then(function (users) {
            res.render('admin/user_index',{
                userInfo:req.userInfo,
                users:users,
                total:count,
                limit:limit,
                pages:pages,
                page:page //前端通过page显示页面
            })
        });
    });


});

/**
 * 分类页
 */
router.get('/category',function (req,res,next) {

    res.render('admin/category_index',{
        userInfo:req.userInfo
    });
});

/**
 * 分类添加页
 */
router.get('/category/add',function (req,res,next) {


    res.render('category/add_index',{
        userInfo:req.userInfo
    })

});

/**
 * 分类添加接口
 */
router.post('/category/add',function (req,res,next) {

    var name=req.body.name||'';
    if(name==''){
        res.message('分类名称不能为空');

    }
    //Category.save().then()

});


router.post('edit',function (req,res,next) {

    var name=req.body.name;

    Category.findOne({_id:id}).then(function (category) {
        if(!category){
            // 分类信息不存在
            return Promise.reject();
        }else{
            if(name == category.name){
                // 修改成功

                return Promise.reject();
            }else{
                // id不等于id
                return Category.findOne({_id:{$ne:id},name:name});
                
            }
        }
        // 会将return 的值作为then的参数same
    }).then(function (sameCategory) {
        if(sameCategory){
            //已有同名分类
            return Promise.reject();
        }else{
            return Category.update({
                _id:id
            },{
                name:name
            });
            
        }
    }).then(function () {
        //修改成功
    });

});


//分类删除

router.post('delete',function (req,res,next) {

    var id=req.body.id;
    Category.remove({_id: id}).then(function () {
        //删除成功
    });
});

//博客查询 populate() 关联查询 Content.where({category:cId}).find  Content.where().count();
// Content.find().limit().skip().populate(['Category','User']).then(function (contents) {
//
// })




module.exports = router;

