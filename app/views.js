define([

	'namespace',
	'backbone'

], function( namespace, Backbone ){

	var View = namespace.module();

	View.Sample = Backbone.View.extend({

		el: "#container",

		events: {

		},

		initialize: function(){

		},
		
		template: 'http://localhost:8000/app/templates/work.html',

		render: function(){
			console.log(namespace);
			namespace.fetchTemplate(this.template, function(tmpl){
				
				$(this.el).html(tmpl( ));

				if (_.isFunction(done)){
					done(this.el);
				}
			});
			return this;
		}

	});

	// new View.Views.Sample();

	return View;

});