"use strict";

const Koa = require('koa');
const serve = require('./static.js');

const app = new Koa();

//Error handling
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.body = { error: err.message };
        ctx.status = err.status || 500;
    }
});

app.use(serve);

console.log('Start server on port 3333');
app.listen(3333);
