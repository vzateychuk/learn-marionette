ContactManager.module("ContactsApp", function(ContactsApp, ContactManager, Backbone, Marionette, $, _)
{
	ContactsApp.Router = Marionette.AppRouter.extend({
		appRoutes: {
			"contacts": "listContacts",
			"contacts/:id": "editContact"
		}
	});

	var API = {
		/* Note that the callback function (e.g. listContacts ) specified in the appRoutes object above must exist in the router’s controller.
			In other words, all the callbacks used in the appRoutes object must be located in our API object.
		*/
		listContacts: function(){
			console.log("route to List was triggered");
			ContactManager.ContactsApp.List.ContactController.listContacts();
		},

		editContact: function(id) {
			console.log("route to Edit was triggered id: " + id);
			ContactsApp.Edit.Controller.editContact(id);
		}
	};

	ContactManager.on("contacts:list", function(){
		ContactManager.navigate("contacts");
		API.listContacts();
	});

	ContactManager.on("contact:edit", function(id){
		ContactManager.navigate("contacts/"+id);
		API.editContact(id);
	});

	ContactManager.addInitializer(function(){
		new ContactsApp.Router({
			controller: API
		});
	});

});