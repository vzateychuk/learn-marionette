ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _) {
	List.ContactController = {

		listContacts: function() {
			var contacts = ContactManager.request("contact:entities");

			var contactsListView = new List.ContactsView({
				collection: contacts
			});

			ContactManager.mainRegion.show(contactsListView);
		}
	}

});