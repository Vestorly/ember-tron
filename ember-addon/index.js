'use strict';

var path = require('path');
var fs   = require('fs');

function EmberTronAddon(project) {
  this.project = project;
  this.name    = 'Tron';
}

function unwatchedTree(dir) {
  return {
    read:    function() { return dir; },
    cleanup: function() { }
  };
}

EmberTronAddon.prototype.treeFor = function treeFor(name) {

  // include app-addon (this has the initializers so that loadInitializers
  // will automatically include them)
  // We must include the initializers as part of the app tree so that
  // the es6 import statements work,
  // and we must also be sure to make those things importable by
  // explicitly declaring them when we do app.import in `included`

  // vendor-addon has the built version of tron as a named amd module,
  // in the directory 'tron', so that it is properly namespaced for our
  // app.import call in `included`

  // There are no styles for tron, so when treeFor is called with 'styles',
  // this is a no-op

  var treePath = path.join('node_modules', 'ember-tron', name + '-addon');

  if (fs.existsSync(treePath)) {
    return unwatchedTree(treePath);
  }
};

EmberTronAddon.prototype.included = function included(app) {
  app.import('vendor/ember-tron/styles/style.css');
};

module.exports = EmberTronAddon;
