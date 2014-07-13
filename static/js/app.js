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

App.ApplicationAdapter = DS.RESTAdapter.extend({
    headers: function() {
	return {
	    'Authorization': 'test',
	    'ABCD': 'abc'
	};
    }
});

// App.AuthenticatedRoute = Ember.Route.extend({
//     getJSONWithToken: function(url) {
// 	var token = this.controllerFor('register').get('token');
// 	Ember.$.ajaxPrefilter(function( options, oriOptions, jqXHR ) {
// 	    jqXHR.setRequestHeader("Authorization", token);
// 	});
// 	return $.getJSON(url);
//     },
//     events: {
// 	error: function(reason, transition) {
// 	    if (reason.status == 401) {
// 		this.transitionTo('login');
// 	    }
// 	}
//     }
// });

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

