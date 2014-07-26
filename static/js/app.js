App = Ember.Application.create();

App.Router.map(function() {
    this.resource('login');
    this.resource('register');
    this.resource('logout');
    this.resource('list', { path: '/list' }, function() {
	this.route('active');
	this.route('completed');
    });
});

App.UnauthorizedError = Ember.Object.extend();

App.ApplicationAdapter = DS.RESTAdapter.extend({
  ajaxError: function(jqXHR) {
      var error = this._super(jqXHR);
      if (jqXHR && jqXHR.status === 403) {
	  return new App.UnauthorizedError();
      }
      return error;
  }
});

App.ApplicationRoute = Ember.Route.extend({
    actions: {
	error: function(reason) {
	    localStorage.removeItem('token');
	    if (reason instanceof App.UnauthorizedError) {
		this.transitionTo('login');
	    }
	}
    },
    setupController: function(controller, model) {
	controller.setup();
    }
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
	if (localStorage['token']) {
	    $.ajaxPrefilter(function( options, oriOptions, jqXHR ) {
 		jqXHR.setRequestHeader("Authorization", localStorage['token']);
 	    });
	}
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

App.LogoutRoute = Ember.Route.extend({
    controllerName: 'login',
    setupController: function(controller, model) {
	localStorage.removeItem('token');
	controller.logout();
    }
});
