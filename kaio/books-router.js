


var router = require('koa-router');

module.exports = function () {
    var dataset = this.inc('books');

    var list = function *(next) {
        var res = dataset;
        yield next;
        this.body = res;
    };

    var show = function *(next) {
        var title = decodeURI(this.params.title);
        var res = dataset.filter(function(x) {
            return title === x.title;
        }).shift();

        yield next;
        this.body = res;
    };

    return router()
        .get('/', list)
        .get('/:title', show)
        .middleware();
}