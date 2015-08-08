"use strict";
var koa = require('koa');
var router = require('koa-router')();
var handlebars = require('koa-handlebars');
var serve = require('koa-static');

var app = koa();

app.use(handlebars({
    layoutsDir: 'templates/layouts',
    viewsDir: 'templates/views',
    partialsDir: 'templates/partials',
    defaultLayout: 'main',
    cache: app.env !== "development",
}));

app.use(serve('dist'));
app.use(function *pageNotFound(next){
    yield next;
    if (404 != this.status) return;
    this.status = 404;
    this.type = 'html';
    yield this.render("404")
});

router.get('/', function *(){
    yield this.render("index")
});

router.get('/projects', function *(){
    yield this.render("projects")
});

app.use(router.routes());
app.use(router.allowedMethods());
var server = app.listen(3000, function() {
    console.log('Successfully started up');
});