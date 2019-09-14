
var mongoose= require('mongoose');


var Schema =mongoose.Schema;

/**
 * 表结构----》模型类
 */
module.exports=new Schema({

    avatar:{
        type:String,
        default:'https://pic2.zhimg.com/v2-4e0e8def963aa65c3b73d92ee4603e9b_is.jpg'
    },

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
