
var mongoose= require('mongoose');


var Schema =mongoose.Schema;

/**
 * 表结构----》模型类
 */
module.exports=new Schema({

    username:String,

    password:String



});
