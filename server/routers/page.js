var express = require('express');


var router =express.Router();


var Content={};


var data;
//通用数据处理
// router.use(function (req,res,next) {
//     data ={
//         userInfo:req.userInfo,
//         categories:[]
//     }

//     // Category.find().then(function (categories) {
//     //     data.categories =categories;
//     //     next();
//     // });
// });


router.get( '*' ,function (req,res,next) {

    res.render('../../client/dist/index',{
        userInfo:req.userInfo
    });
});


// //详情页阅读数量
// router.get('/detail',function(req,res){

//     var contentId=req.query.contentId||'';

//     Content.findOne({_id:contentId}).then(function (content) {
//         data.content =content;
//         content.views++;
//         content.save();
//     });


// });

// 评论放在文章下面

//将then异步回调作为父级回调的返回值，让then在父级重复，而不是子级孙级无限回调


module.exports = router;
