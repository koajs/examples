const Koa = require('koa');
const fs = require('fs');
const app = module.exports = new Koa();
const path = require('path');
const extname = path.extname;

// try GET /app.js

app.use(async function(ctx) {
  const fpath = path.join(__dirname, ctx.path);
  const fstat = await stat(fpath);

  if (fstat.isFile()) {
    ctx.type = extname(fpath);
    ctx.body = fs.createReadStream(fpath);
  }
});

if (!module.parent) app.listen(3000);

/**
 * thunkify stat
 */

function stat(file) {
  return new Promise(function(resolve, reject) {
    fs.stat(file, function(err, stat) {
      if (err) {
        reject(err);
      } else {
        resolve(stat);
      }
    });
  });
}
