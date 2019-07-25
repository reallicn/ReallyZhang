
var express = require('express');


var app = express();

app.get('/',function(req ,res,next){

    res.send('<h1>你好，世界！</h1>');
});


app.listen(3636,function(){
    console.log('启动成功，浏览器输入：https://localhost:3636');
});