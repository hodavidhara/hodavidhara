var request = require('request');
var _ = require('lodash');

var PROJECTS_REQUEST = {
    url: 'https://api.github.com/users/hodavidhara/repos',
    headers: {
        'User-Agent': 'hodavidhara/hodavidhara'
    },
    qs: {
        sort: 'pushed'
    }
};

var IGNORE_PROJECTS = ['Tumblr-Themes'];

var ProjectService = function () {};

ProjectService.prototype.getProjects = function () {
    return new Promise(function (resolve, reject) {
        request(PROJECTS_REQUEST, function (err, res, body) {
            if (err) {
                reject(err);
            } else {
                var projects = _.map(JSON.parse(body), _cleanProject);
                projects = _.filter(projects, function (project) {
                    return !_.contains(IGNORE_PROJECTS, project.name);
                });
                resolve(projects);
            }
        })
    });
};

var _cleanProject = function(project) {
    return {
        'name': project.name,
        'description': project.description,
        'html_url': project.html_url,
        'pushed_at': project.pushed_at
    }
};

var service = new ProjectService();

module.exports = service;