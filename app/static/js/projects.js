var request = require('browser-request');
var ProjectCard = require('./hodavidhara/projectcard');
var dom = require('domquery');
var domReady = require('domready');

request({url: '/api/projects', json: true}, function(err, res, body) {
    domReady(function () {
        var projectContainer = dom('#projects');

        body.forEach(function(projectData) {
            var card = new ProjectCard({
                data: projectData
            });
            projectContainer.add(card.htmlNode);
        });
    });
});
