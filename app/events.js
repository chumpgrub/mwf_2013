define([

	'namespace'

], function( namespace ){

	var vent = namespace.app;

	vent.on('page:navigate', function(slug){
		// alert(slug);
		var sect_position = $('section.'+slug).position().top;
		$('html,body').animate({ scrollTop: sect_position },600);
		$('body').removeClass().addClass(slug);
		// $(window).scrollTop(sect_position);
		// alert(sect_position);
		console.log(slug, sect_position);
	});


	vent.on('sample:navigate', function(slug){

	});

	return vent;

});
