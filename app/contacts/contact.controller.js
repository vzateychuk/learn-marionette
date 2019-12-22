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

			ContactManager.mainRegion.show(contactsListView);
		}
	}

});