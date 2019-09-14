
/**
 * 评论
 */
var mongoose = require('mongoose');


var commentSchema = require('../schemas/comment');


module.exports=mongoose.model('Article',commentSchema);
