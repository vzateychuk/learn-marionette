ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _) {
	List.ContactController = {

		listContacts: function() {
			var contacts = ContactManager.request("contact:entities");

			var contactsListView = new List.ContactsView({
				collection: contacts
			});

			contactsListView.on("itemview:contact:delete", function (childView, model) {
				console.log("--> Contact.Controller.onDelete. Removing the model: '"
					+ model.get("firstName") + " " + model.get("lastName") + "'")
				contacts.remove(model);
			});

			contactsListView.on("itemview:contact:highlight", function (childView, model) {
				console.log("--> Contact.Controller.Highlighting toggled on model: ", model);
			});

			contactsListView.on("itemview:contact:show", function(childView, model){
				console.log("Received itemview:contact:show event on model ", model);
				ContactManager.ContactsApp.Show.Controller.showContact(model);
			});

			ContactManager.mainRegion.show(contactsListView);
		}
	}

});