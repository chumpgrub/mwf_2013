define([
	
	// Libs
	"jquery",
	"underscore",
	"backbone"
],

function( $, _, Backbone ) {
	// Put application wide code here
	
	// app.router = new Router();

	// TYPEKIT
	(function() {
		var config = {
		kitId: 'por5opf',
		scriptTimeout: 3000
	};
	var h=document.getElementsByTagName("html")[0];h.className+=" wf-loading";var t=setTimeout(function(){h.className=h.className.replace(/(\s|^)wf-loading(\s|$)/g," ");h.className+=" wf-inactive"},config.scriptTimeout);var tk=document.createElement("script"),d=false;tk.src='//use.typekit.net/'+config.kitId+'.js';tk.type="text/javascript";tk.async="true";tk.onload=tk.onreadystatechange=function(){var a=this.readyState;if(d||a&&a!="complete"&&a!="loaded")return;d=true;clearTimeout(t);try{Typekit.load(config)}catch(b){}};var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(tk,s)
	})();



	return {
		// This is useful when developing if you don't want to use a
		// build process every time you change a template.
		//
		// Delete if you are using a different template loading method.
		fetchTemplate: function(path, done) {
			var JST = window.JST = window.JST || {};
			var def = new $.Deferred();

			// Should be an instant synchronous way of getting the template, if it
			// exists in the JST object.
			if (JST[path]) {
				if (_.isFunction(done)) {
					done(JST[path]);
				}
				return def.resolve(JST[path]);
			}

			// Fetch it asynchronously if not available from JST, ensure that
			// template requests are never cached and prevent global ajax event
			// handlers from firing.
			$.ajax({
				url: path,
				type: "get",
				dataType: "text",
				cache: false,
				global: false,

				success: function(contents) {
					JST[path] = _.template(contents);

					// Set the global JST cache and return the template
					if (_.isFunction(done)) {
						done(JST[path]);
					}

					// Resolve the template deferred
					def.resolve(JST[path]);
				}
			});

			// Ensure a normalized return value (Promise)
			return def.promise();
		},

		// Create a custom object with a nested Views object
		module: function(additionalProps) {
			return _.extend({ Views: {} }, additionalProps);
		},

		// Keep active application instances namespaced under an app object.
		app: _.extend({}, Backbone.Events)
	};
});
