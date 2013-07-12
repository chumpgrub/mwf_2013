define([

	'namespace',
	'views',
	'models',
	'events'

], function( namespace, View, Model, vent ){

	var Router = namespace.module();

	Router.Global = Backbone.Router.extend({
		routes: {
			""				: "defaultRouter",
			"skills"		: "skillsRouter",
			"contact"		: "contactRouter"
		},

		defaultRouter: function(){
			// $('#container').load('index.html #container > *');
		},

		skillsRouter: function(){
			vent.trigger('page:navigate','skills');
		},

		contactRouter: function(){
			vent.trigger('page:navigate', 'contact');
		}

	});

	var router = new Router.Global();

	console.log('from router');

	return Router;

});
