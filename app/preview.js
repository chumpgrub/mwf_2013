define([

	"namespace",
	"work",
	"events",
	"util"

], function( namespace, work, vent, util ){

	var Prev = namespace.module();

	Prev.Model = Backbone.Model.extend();

	Prev.Collection = Backbone.Collection.extend({
		model: Prev.Model
	});


	Prev.Views.Samples = Backbone.View.extend({
		
		className: 'thumb-wrap',

		events: {
			'mouseover' : 'hoverEvent'
		},

		hoverEvent: function(e){
			console.log($(e.currentTarget));
		},

		render: function(){
			this.collection.each(this.addOne, this);
			return this;
		},

		addOne: function(thumb){
			var thumbView = new Prev.Views.Sample({ model: thumb });
			this.$el.append(thumbView.render().el);
		}
	});


	Prev.Views.Sample = Backbone.View.extend({
		
		className: 'thumb',

		template: _.template( '<span></span>' ),

		events: {
			"click" : "updatePreview"
		},

		defaultPreview: function(){
			var info = new Prev.Views.Info({ model: this.model });
			$('.thumb-info').html(info.render().el);
			$('.thumb-info').removeClass('default');
		},

		updatePreview: function(e){
			var info = new Prev.Views.Info({ model: this.model });
			$('.thumb-info').html(info.render().el);
			$('.thumb').removeClass('active');
			$(e.target).parent('.thumb').addClass('active');
		},

		render: function(){
			var template = this.template( this.model.toJSON() );
			this.$el.addClass(this.model.get('id'));
			this.$el.html( template );

			if ( util.defaultInfo() === true ){
				this.defaultPreview();
			}
			return this;
		}

	});

	Prev.Views.Info = Backbone.View.extend({

		template: _.template( $('#previewTemplate').html() ),

		render: function(){
			var template = this.template( this.model.toJSON() );
			this.$el.html(template);
			return this;
		}

	});


	var preview = new Prev.Views.Samples({ collection: workcollection });
	$('.gallery').append(preview.render().el);

	return Prev;

});
