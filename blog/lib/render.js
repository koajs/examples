
/**
 * Module dependencies.
 */

var views = require('co-views');
var path = require('path');

// setup views mapping .html
// to the swig template engine

module.exports = views(path.join(__dirname, '/../views'), {
  map: { html: 'swig' }
});
