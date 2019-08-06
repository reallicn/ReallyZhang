
/**
 * 博客
 */


var mongoose =require('mongoose');

module.exports=new mongoose.Schema({

    //关联字段
    category:{
      type:mongoose.Schema.Types.ObjectId,
      //引用
      ref:'Category'
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
    read:{
        type:Number,
        default:0
    },
    title:String,
    description:{
        type:String,
        default:''
    },
    content:{
        type:String,
        default:''
    },

    //分类名称
    name:String

});
