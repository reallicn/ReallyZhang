
/**
 * 博客
 */


var mongoose =require('mongoose');

module.exports=new mongoose.Schema({

     //关联评论字段
     comment:{
        type:mongoose.Schema.Types.ObjectId,
        //引用
        ref:'Comment'
    },
    //关联字段
    article:{
      type:mongoose.Schema.Types.ObjectId,
      //引用
      ref:'Article'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        //引用
        ref:'User'
    },
    addTime:{
      type:Date,
      default:new Date()
    },
    content:{
        type:String,
        default:''
    },

    //分类名称
    name:String

});
