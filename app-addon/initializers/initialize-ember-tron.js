export default {
  name: 'ember-tron',

  initialize: function(container, app) {
    app.inject('router:main',            'progressService', 'service:ember-tron');
    app.inject('component:ember-tron',   'progressService', 'service:ember-tron');
  }
};

Ember.Router.reopen({
  _doTransition: function() {
    var router = this;
    var progressService = this.get('progressService');
    // approximate some random point to fake progress
    progressService.set('progress', (Math.random() * 40 + 40));
    return this._super.apply(this, arguments).promise.finally(function() {
      progressService.set('progress', 100);
    });
  }
});