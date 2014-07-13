App = Ember.Application.create();

// communicate with fixture data
// App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Router.map(function() {
    this.resource('login');
    this.resource('register');
    this.resource('list', { path: '/list' }, function() {
	this.route('active');
	this.route('completed');
    });
});

App.IndexRoute = Ember.Route.extend({
    renderTemplate: function() {
	this.render('login');
    }
});

App.LoginRoute = Ember.Route.extend({
    setupController: function(controller, model) {
	controller.reset();
    }
});

App.ListRoute = Ember.Route.extend({
    model: function () {
	return this.store.find('item');
    }
});

App.ListIndexRoute = Ember.Route.extend({
    controllerName: 'list',
    setupController: function (controller, model) {
	controller.set('filteredList', this.modelFor('list'));
    }
});

App.ListActiveRoute = Ember.Route.extend({
     controllerName: 'list',
     setupController: function (controller, model) {
 	var list = this.store.filter('item', function (item) {
 	    return !item.get('completed');
 	});
	
 	controller.set('filteredList', list);
     }
});

App.ListCompletedRoute = Ember.Route.extend({
     controllerName: 'list',
     setupController: function (controller, model) {
 	var list = this.store.filter('item', function (item) {
 	    return item.get('completed');
 	});
	
 	controller.set('filteredList', list);
     }
});

