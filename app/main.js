require([

	'namespace',
	'preview',
	'work',
	// 'views/app',
	'routers'
	// 'models',
	// 'views'

],

function( namespace ){

	var pushState = !!(window.history && window.history.pushState),
	settings = {
		pushState: pushState,
		silent: false,
		hashChange: !pushState ? true : false
	};

	Backbone.history.start(settings);


	// All navigation that is relative should be passed through the navigate
	// method, to be processed by the router.  If the link has a data-bypass
	// attribute, bypass the delegation completely.
	$(document).on("click", "a:not([data-bypass])", function(evt) {
		// Get the anchor href and protcol
		var href = $(this).attr("href");
		var protocol = this.protocol + "//";

		// Ensure the protocol is not part of URL, meaning its relative.
		if (href && href.slice(0, protocol.length) !== protocol &&
				href.indexOf("javascript:") !== 0) {
			// Stop the default event to ensure the link will not cause a page
			// refresh.
			evt.preventDefault();

			// alert('prevent default');

			// `Backbone.history.navigate` is sufficient for all Routers and will
			// trigger the correct events.  The Router's internal `navigate` method
			// calls this anyways.
			Backbone.history.navigate(href, true);
		}
	});


});
