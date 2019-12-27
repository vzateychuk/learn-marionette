var ContactManager = new Marionette.Application();

ContactManager.addRegions({
	mainRegion: "#main-region"
});

ContactManager.navigate = function(route, options){
	options || (options = {});
	Backbone.history.navigate(route, options);
};

ContactManager.getCurrentRoute = function(){
	return Backbone.history.fragment
};

ContactManager.on("initialize:after", function(){
	console.log("ContactManager initialize:after started!");

	if(Backbone.history){
		Backbone.history.start();

		if(this.getCurrentRoute() === ""){
			this.navigate("contacts");
			ContactManager.ContactsApp.List.ContactController.listContacts();
		}
	}

});
