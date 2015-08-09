var Handlebars = require("hbsfy/runtime");
var moment = require('moment');

Handlebars.registerHelper('dateFormat', function(context, block) {
    var f = block.hash.format || "MMM DD, YYYY hh:mm:ss A";
    return moment(context).format(f);
});