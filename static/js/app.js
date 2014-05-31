window.App = Ember.Application.create();

// communicate with fixture data
App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Router.map(function() {
    this.resource('list', { path: '/' }, function() {
	this.route('active');
	this.route('completed');
    });
});

App.ListIndexRoute = Ember.Route.extend({
  model: function() {
      return this.modelFor('list');
  }
});

App.ListActiveRoute = Ember.Route.extend({
  model: function(){
    return this.store.filter('item', function(item) {
      return !item.get('isCompleted');
    });
  },
  renderTemplate: function(controller) {
    this.render('list/index', {controller: controller});
  }
});

App.ListCompletedRoute = Ember.Route.extend({
  model: function() {
    return this.store.filter('item', function(item) {
      return item.get('isCompleted');
    });
  },
  renderTemplate: function(controller) {
    this.render('list/index', {controller: controller});
  }
});

App.ListRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('item');
  }
});

