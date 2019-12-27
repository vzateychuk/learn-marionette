ContactManager.module("ContactsApp", function(ContactsApp, ContactManager, Backbone, Marionette, $, _)
{
	ContactsApp.Router = Marionette.AppRouter.extend({
		appRoutes: {
			"contacts": "listContacts"
		}
	});

	var API = {
		/* Note that the callback function (e.g. listContacts ) specified in the appRoutes object above must exist in the router’s controller.
			In other words, all the callbacks used in the appRoutes object must be located in our API object.
		*/
		listContacts: function(){
			console.log("route to list contacts was triggered");
			ContactManager.ContactsApp.List.ContactController.listContacts();
		}
	};

	ContactManager.on("contacts:list", function(){
		ContactManager.navigate("contacts");
		API.listContacts();
	});

	ContactManager.addInitializer(function(){
		new ContactsApp.Router({
			controller: API
		});
	});

});