var elasticsearch = require('elasticsearch');
var apod = require('nasa-apod');
var moment = require('moment');

var date = moment();

var client = new elasticsearch.Client({
    host: 'es.hodavidhara.com',
    apiVersion: '1.7'
});

var apodClient = new apod.Client({
    apiKey: 'OCmskm6eTVLx9NoSVaxXzwJd3yYsP0cNKdSTzj4e'
});

var _indexPicture = function (picture) {
    console.log('indexing apod for', picture.date);

    return client.index({
        index: 'apod',
        type: 'picture',
        body: picture
    })
};

(function loop() {

    console.log('getting apod for ', date.format('YYYY-MM-DD'));

    apodClient(date).then(function (picture) {
        picture = JSON.parse(picture);
        picture.date = date.format('YYYY-MM-DD');
        return picture;
    }).then(_indexPicture).then(function () {
        date.subtract(1, 'days');
        setTimeout(loop, 500);
    }).catch(function (err) {
        console.log(err);
        date.subtract(1, 'days');
        setTimeout(loop, 500);
    });
})();