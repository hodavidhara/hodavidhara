"use strict";
var koa = require('koa'),
    router = require('koa-router')();

var app = koa();

router.get('/', function *(){
    console.log('test');
    this.body = 'Hello World';
});

app.use(router.routes());
app.use(router.allowedMethods());
var server = app.listen(3000, function() {
    console.log('Successfully started up');
});