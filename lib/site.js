exports.Site = Site = function(){
	
};

Site.prototype.categories = [];
Site.prototype.tags = [];

Site.prototype.export =  function(file){
	console.log('exported to ' + file);
};

