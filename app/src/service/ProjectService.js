var _ = require('lodash');
var async = require('async');
var GitHubApi = require('github');
var conf = require('konfig')();

var github = new GitHubApi({
    version: "3.0.0",
    headers: {
        'User-Agent': 'hodavidhara/hodavidhara'
    }
});

var IGNORE_PROJECTS = ['Tumblr-Themes'];

var ProjectService = function () {
};

ProjectService.prototype.getProjects = function () {
    return _getProjects().then(_processProjects)
        .catch(function (err) {
            console.log(err);
        });
};

var _getProjects = function() {
    return new Promise(function (resolve, reject) {
        _authenticate();
        github.repos.getFromUser({
            user: 'hodavidhara'
        }, function (err, result) {
            if (err) {
                reject(err)
            } else {
                resolve(result);
            }
        })
    })
};

var _processProjects = function (projects) {
    return _loadLanguages(projects)
        .then(_cleanProjects)
        .then(_filterProjects)
        .then(_sortProjects);
};

var _loadLanguages = function (projects) {
    return new Promise(function (resolve, reject) {
        async.each(projects, function (project, cb) {
            github.repos.getLanguages({
                user: 'hodavidhara',
                repo: project.name
            }, function (err, body) {
                if (err) {
                    project.languages = {};
                    cb();
                } else {
                    delete body.meta;
                    project.languages = body;
                    cb()
                }
            });
        }, function () {
            resolve(projects);
        })
    })
};

var _cleanProjects = function (projects) {
    return new Promise(function (resolve, reject) {
        async.map(projects, _cleanProject, function (err, cleanProjects) {
            resolve(cleanProjects);
        });
    });
};

var _cleanProject = function(project, cb) {
    cb(null, {
        'name': project.name,
        'description': project.description,
        'html_url': project.html_url,
        'pushed_at': project.pushed_at,
        'languages': project.languages
    })
};

var _filterProjects = function (projects) {
    return new Promise(function (resolve, reject) {
        async.filter(projects, function (project, cb) {
            cb(!_.includes(IGNORE_PROJECTS, project.name));
        }, function (filteredProjects) {
            resolve(filteredProjects);
        });
    })
};

var _sortProjects = function (projects) {
    return new Promise(function (resolve, reject) {
        resolve(_(projects).sortBy('pushed_at').reverse());
    })
};

var _authenticate = function () {
    if (conf.github.type) {
        github.authenticate(conf.github);
    }
};

var service = new ProjectService();

module.exports = service;