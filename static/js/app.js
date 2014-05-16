App = Ember.Application.create();

// communicate with fixture data
App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Router.map(function() {
    this.resource('item', { path: '/' });
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});

App.ItemRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('item');
  }
});
