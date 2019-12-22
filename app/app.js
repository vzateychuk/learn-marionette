var ContactManager = new Marionette.Application();

ContactManager.addRegions({
	mainRegion: "#main-region"
});

ContactManager.on("initialize:after", function(){
	console.log("ContactManager initialize:after started!");

	ContactManager.ContactsApp.List.ContactController.listContacts();
});
