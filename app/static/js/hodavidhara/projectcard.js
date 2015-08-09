var projectCardTemplate = require('./templates/projectcard.hbs');
var moment = require('moment');
var dateHelper = require('./helpers/dateformatter');

var ProjectCard = function(args) {
    this.data = args.data;
    this.init();
    this.render();
};

ProjectCard.prototype.init = function () {
    this.data.pushed_at = moment(this.data.pushed_at);
};

ProjectCard.prototype.render = function () {
    this.htmlNode = projectCardTemplate(this.data);
};

module.exports = ProjectCard;