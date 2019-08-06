
var mongoose= require('mongoose');


var Schema =mongoose.Schema;

/**
 * 表结构----》模型类
 */
module.exports=new Schema({

    registerType:String,

    phone:String,

    username:String,

    email:String,

    password:String,

    isAdmin:{
        type:Boolean,
        default:false
    }

});
