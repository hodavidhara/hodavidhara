var router = require('koa-router');

var siteRouter = router();

siteRouter.get('/', function *(){
    yield this.render("index")
});

siteRouter.get('/projects', function *(){
    yield this.render("projects")
});

module.exports = siteRouter;