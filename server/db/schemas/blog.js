
/**
 * 博客
 */


var mongoose =require('mongoose');

module.exports=new mongoose.Schema({

    //关联字段
    categoryId:{
      type:mongoose.Schema.Types.ObjectId,
      //引用
      ref:'Category'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        //引用
        ref:'User'
    },
    createTime:{
      type:Number,
      default:new Date().getTime()
    },
    read:{
        type:Number,
        default:1
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

    short:{
        type:String,
        default:''
    },
    face:{
        type:String,
        default:''
    },
    
});
