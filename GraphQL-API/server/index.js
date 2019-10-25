import Koa from 'koa';
import respond from 'koa-respond';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import initDB from './models/initidb';
import Person from './models/person';
import graphql from 'graphql';
const app = new Koa();
const port = 3000;
const mount = require('koa-mount');
const graphqlHTTP = require('koa-graphql');
const schema = require('./graphql/schema');
import RootQuery from  './graphql/schema'

initDB();


app.use(mount('/graphql', graphqlHTTP({
    schema: RootQuery,
        graphiql: true
    })));

app.use((ctx, next) => {
    try {
        next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
        ctx.app.emit('error', err, ctx);
        }
 });

// set server
app.use(bodyParser());
app.use(respond());
app.use(logger());
app.listen(port, function(){
    console.log('server working');
})

export default app.listen();
