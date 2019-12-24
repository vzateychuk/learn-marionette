var ContactManager = new Marionette.Application();

ContactManager.addRegions({
	mainRegion: "#main-region"
});

ContactManager.on("initialize:after", function(){
	console.log("ContactManager initialize:after started!");

	if(Backbone.history){
		Backbone.history.start();
	}

	ContactManager.ContactsApp.List.ContactController.listContacts();
});
