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
				model.destroy();
			});

			contactsListView.on("itemview:contact:edit", function(childView, model){
				console.log("Received itemview:contact:edit event on model ", model);
				// ContactManager.ContactsApp.Edit.Controller.editContact(model);
				ContactManager.trigger("contact:edit", model.get("id"));
			});

			ContactManager.mainRegion.show(contactsListView);
		}
	}

});