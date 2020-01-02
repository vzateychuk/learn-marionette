ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _) {
	List.ContactController = {

		listContacts: function() {
			var contactListPromise = ContactManager.request("contact:entities");

			var loadingView = new ContactManager.Common.Views.LoadingView({
				title: "List Loading Delay",
				message: "Loading List is delayed to demonstrate using a loading view."
			});
			ContactManager.mainRegion.show(loadingView);

			$.when(contactListPromise).done( function (contacts) {
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
			});

		}
	}

});