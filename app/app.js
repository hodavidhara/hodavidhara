"use strict";
var koa = require('koa');
var router = require('koa-router')();
var handlebars = require('koa-handlebars');

var app = koa();

app.use(handlebars({
    layoutsDir: 'templates/layouts',
    viewsDir: 'templates/views',
    partialsDir: 'templates/partials',
    defaultLayout: 'main',
    cache: app.env !== "development",
    data: {
        dev: app.env === "development"
    }
}));

app.use(serve('static'));

router.get('/', function *(){
    yield this.render("index")
});

app.use(router.routes());
app.use(router.allowedMethods());
var server = app.listen(3000, function() {
    console.log('Successfully started up');
});