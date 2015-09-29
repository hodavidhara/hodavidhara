var dom = require('domquery');
var domReady = require('domready');

domReady(function () {
    var nav = dom('#nav');
    var menuButton = dom('#nav .icon');
    var overlay = dom('#nav .overlay');

    menuButton.on('click', function () {
        nav.toggleClass('active');
    });
    overlay.on('click', function () {
        nav.removeClass('active');
    })
});