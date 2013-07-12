define([
	
	"namespace"

], function( namespace ){

	var Util = namespace.module();

	Util.findModel = {
		curIndex: function(model, library){
			return library.indexOf(model);
		},
		prevSample: function(curIndex, library){
			var prevIndex = curIndex - 1;
			if (prevIndex === -1){
				prevIndex = library.models.length-1;
			}
			return library.at(prevIndex).get('id');
		},
		nextSample: function(curIndex, library){
			var nextIndex = curIndex + 1;
			if ( nextIndex >= library.models.length ){
				nextIndex = 0;
			}
			return library.at( nextIndex ).get('id');
		},
		setNavs: function(model,collection){
			var curIndex = Util.findModel.curIndex(model, collection);
			return {
				cur: Util.findModel.curIndex(model,collection),
				next: Util.findModel.nextSample(curIndex, collection),
				prev: Util.findModel.prevSample(curIndex, collection)
			};
		}
	};

	Util.defaultModel = function(collection,id){
		
		if (collection.first().get('id') == id){
			// console.log(collection.first().get('id'));
			return collection.first();
		}


	};

	Util.defaultInfo = function(){
		if ( $('.thumb-info').hasClass('default') ){
			return true;
		} else {
			return false;
		}
	};

	return Util;

});
