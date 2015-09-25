"use strict";
var koa = require('koa');
var siteRouter = require('./src/routes/site');
var apiRouter = require('./src/routes/api');
var handlebars = require('koa-handlebars');
var serve = require('koa-static');

var app = koa();
if (app.env === "prod") {
    require('newrelic');
}

app.use(handlebars({
    layoutsDir: 'templates/layouts',
    viewsDir: 'templates/views',
    partialsDir: 'templates/partials',
    defaultLayout: 'main',
    cache: app.env !== "development"
}));

app.use(serve('dist'));
app.use(function *pageNotFound(next){
    yield next;
    if (404 != this.status) return;
    this.status = 404;
    this.type = 'html';
    yield this.render("404")
});

app.use(siteRouter.routes());
app.use(siteRouter.allowedMethods());
app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());
var server = app.listen(3000, function() {
    console.log('Successfully started up');
});