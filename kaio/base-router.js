


module.exports = function *(next) {
    yield next;

    if (this.res.statusCode === 200)
        return;

    this.body = 'Hello world!';
}