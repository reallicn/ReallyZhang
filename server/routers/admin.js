var express = require('express');


var router =express.Router();


/**
 * 静态文件托管
 */
router.get('/user',function (req,res,next) {

    res.send('user');
});


module.exports = router;

