
/**
 * 分类
 * 暂时分为：技术和生活，后期可能细分为Android，前端等
 */


var mongoose =require('mongoose');

module.exports=new mongoose.Schema({

    //分类名称
    name:String

});
