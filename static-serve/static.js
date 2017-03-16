"use strict";

const fs = require('fs');
const path = require('path');

function is_stat_error_bad(error) {
    switch (error.code) {
        case 'ENOENT':
        case 'ENAMETOOLONG':
        case 'ENOTDIR':
            return false;
        default:
            return true;
    }
}

/**
 * Retrieves static file from served directory.
 *
 * @param {String} root Valid and existing directory from where to look for path.
 * @param {String} request_path HTTP Request path.
 *
 * @returns {Promise} Promise resolves to object {stats, path} if file to serve is found.
 *                    Otherwise it resolves to undefined i.e. no file to serve.
 */
function get_static_file(root, request_path) {
    return new Promise((resolve, reject) => {
        const front_path = path.join(root, request_path);

        fs.stat(front_path, (err, stat) => {
            if (err) {
                if (is_stat_error_bad(err)) reject(err);
                else resolve(undefined);
            }
            else {
                if (stat.isDirectory()) {
                    const index_path = path.join(front_path, 'index.html');

                    fs.stat(index_path, (err, stat) => {
                        if (err) {
                            if (is_stat_error_bad(err)) reject(err);
                            else resolve(undefined);
                        }
                        else {
                            resolve({
                                stats: stat,
                                path: index_path
                            });
                        }
                    });
                }
                else {
                    resolve({
                        stats: stat,
                        path: front_path
                    });
                }
            }
        });
    });
}

const front_dir = path.join(__dirname, 'public');

async function front_server(ctx, next) {
    const front = await get_static_file(front_dir, ctx.request.path);

    if (front) {
        ctx.response.length = front.stats.size;
        ctx.response.type = path.extname(front.path);
        ctx.response.lastModified = front.stats.mtime;

        ctx.response.etag = `W/"${front.stats.size.toString(16)}-${front.stats.mtime.getTime().toString(16)}"`;
        ctx.response.status = 200;

        if (ctx.request.fresh) {
            ctx.response.status = 304;
            ctx.response.body = null;
        }
        else {
            ctx.response.body = fs.createReadStream(front.path);
        }
    }
    else {
        await next();
    }
}

module.exports = front_server;
