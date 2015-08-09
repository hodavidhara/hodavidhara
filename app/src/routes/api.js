var router = require('koa-router');
var ProjectService = require('../service/ProjectService');

var apiRouter = router({
    'prefix': "/api"
});

apiRouter.get('/projects', function *(){
    this.body = yield ProjectService.getProjects();
});

module.exports = apiRouter;