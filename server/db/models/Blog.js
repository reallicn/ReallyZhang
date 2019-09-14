var mongoose = require('mongoose');


var articleSchema = require('../schemas/blog');


module.exports=mongoose.model('Blog',articleSchema);
