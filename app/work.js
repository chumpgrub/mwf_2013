define([

	"namespace",
	"events",
	"util"

], function( namespace, vent, util ){

	var Work = namespace.module();

	Work.Router = Backbone.Router.extend({
		
		routes: {
			"work"			: "workDefault",
			"work/:slug"	: "workSample"
		},

		workDefault: function(){
			vent.trigger('page:navigate','gallery');
		},

		workSample: function(slug){
			var sample = new Work.Views.Sample({ model: workcollection.get(slug) });
			$('body').addClass('sample');

			console.log(slug);
			
			sample.render(function(el){

				if ( $('.work-wrapper').length == 1 ){
					console.log('work-wrapper exists');
					$('#central').delay(0).css('display','none').html(el).show();
				} else {
					$('#central').delay(0).css('display','none').html(el).fadeIn();
				}

				$('#header').animate({ 'height' : '0'}, 500, function(){
					$(this).css({
						'position': 'fixed',
						'width': $('#container').width()+'px'
					});
					$('#nav').css({
						'position': 'fixed',
						'width': $('#container').width()+'px',
						'top': '4px'
					});
					$('.work-wrapper').css('margin-top','3em');
					
				});
			});
		}
	});

	new Work.Router();

	Work.Model = Backbone.Model.extend({});

	Work.Collection = Backbone.Collection.extend({
		model: Work.Model
	});

	Work.Views.Sample = Backbone.View.extend({

		className: 'work-wrapper clearfix',

		template: 'http://localhost:8000/app/templates/work.html',

		render: function(done){
			var view = this;
			var data = view.model.toJSON();
			var nav = util.findModel.setNavs(view.model, workcollection);
			data.nav = nav;

			namespace.fetchTemplate(view.template, function(tmpl){
				
				$(view.el).html(tmpl( data ));

				if (_.isFunction(done)){
					done(view.el);
				}
			});
			return this;
		}
	});

	$(function(){
		$(document).scroll(function(){
			var aside = $('#sample-content'),
				aside_width = aside.width();

			if (aside.length > 0){
				if ( $(document).scrollTop() >= aside.position().top-100 ){
					aside.css({
						'position': 'fixed',
						'top': '52px'
					});

					$('#container').append(aside);
				}

				if ( $(document).scrollTop() <= $('.work-wrapper header').position().top+$('.work-wrapper header').height() ){
					aside.css({
						'position': 'static',
						'margin-left': 0
					});
					$('.work-wrapper').append(aside);
				}
			}
		});
	});


	window.workcollection = new Work.Collection([
		{
			"id": "socialogic",
			"title": "SociaLogic Marketing",
			"subtitle": "",
			"description": "Vestibulum id ligula porta felis euismod semper. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam id dolor id nibh ultricies vehicula ut id elit.",
			"site_url": "http://www.socialogicmarketing.com",
			"header_img": "header.jpg",
			"samples": [
				{
					"file": "dummy.gif",
					"width": "500",
					"height": "500"
				}
			]
		},
		{
			"id": "aqueity",
			"title": "Aqueity",
			"subtitle": "something",
			"description": "Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.",
			"site_url": "http://aqueity.com",
			"header_img": "header.jpg",
			"samples": [
				{
					"file": "dummy.gif",
					"width": "500",
					"height": "500"
				},
				{
					"file": "dummy.gif",
					"width": "500",
					"height": "500"
				}
			]
		},
		{
			"id": "planb",
			"title": "Plan B",
			"subtitle": "something",
			"description": "Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Nulla vitae elit libero, a pharetra augue. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.",
			"site_url": "http://thisisplanb.com",
			"header_img": "header.jpg",
			"samples": [
				{
					"file": "dummy.gif",
					"width": "500",
					"height": "500"
				},
				{
					"file": "dummy.gif",
					"width": "500",
					"height": "500"
				},
				{
					"file": "dummy.gif",
					"width": "500",
					"height": "500"
				},
				{
					"file": "dummy.gif",
					"width": "500",
					"height": "500"
				}
			]
		},
		{
			"id": "advantage-futures",
			"title": "Advantage Futures",
			"subtitle": "something",
			"description": "Donec ullamcorper nulla non metus auctor fringilla. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Nullam quis risus eget urna mollis ornare vel eu leo. Maecenas faucibus mollis interdum. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.",
			"site_url": "http://advantagefutures.com",
			"header_img": "header.jpg",
			"samples": [
				{
					"file": "dummy.gif",
					"width": "500",
					"height": "500"
				},
				{
					"file": "dummy.gif",
					"width": "500",
					"height": "500"
				}
			]
		}
	]);

	return Work;

});
