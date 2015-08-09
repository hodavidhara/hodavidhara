var request = require('browser-request');
var ProjectCard = require('./hodavidhara/projectcard');
var _ = require('lodash');
var dom = require('domquery');
var domReady = require('domready');

request({url: '/api/projects', json: true}, function(err, res, body) {
    domReady(function () {
        var projectContainer = dom('#projects');

        _.forEach(body, function(projectData) {
            var card = new ProjectCard({
                data: projectData
            });
            projectContainer.add(card.htmlNode);
        });
    });
});

