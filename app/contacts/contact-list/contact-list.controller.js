ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _) {

	List.ContactController = {

		listContacts: function() {
			var loadingView = new ContactManager.Common.Views.LoadingView({
				title: "List Loading Delay",
				message: "Loading List is delayed to demonstrate using a loading view."
			});
			ContactManager.mainRegion.show(loadingView);

			var contactListPromise = ContactManager.request("contact:entities");

			var contactsListLayout = new List.Layout();
			var contactsListPanel = new List.Panel();

			$.when(contactListPromise).done( function (contacts) {
				var filteredContacts = ContactManager.Entities.FilteredCollection({
					collection: contacts,
					filterFunction: function(filterCriterion){
						var criterion = filterCriterion.toLowerCase();
						return function(contact){
							if(contact.get("firstName").toLowerCase().indexOf(criterion) !== -1
									|| contact.get("lastName").toLowerCase().indexOf(criterion) !== -1) {
								return contact;
							}
						};
					}
				});

				var contactsListView = new List.ContactsView({
					collection: filteredContacts
				});

				contactsListLayout.on("show", function () {
					contactsListLayout.panelRegion.show(contactsListPanel);
					contactsListLayout.contactsRegion.show(contactsListView);
				});

				contactsListPanel.on("contacts:filter", function(filterCriteria){
					console.log("--> filter list with Criteria: ", filterCriteria);
					filteredContacts.filter(filterCriteria);
				});

				contactsListPanel.on("contact:new", function () {
					var newContact = new ContactManager.ContactsApp.Entities.Contact();

					var view = new ContactManager.ContactsApp.New.ContactView({
						model: newContact,
						asModal: true
					});

					view.on("form:submit", function(data){
						var contactWithHighestId = contacts.max( function(c) { return c.id; } );
						var highestId = contactWithHighestId.get("id");
						data.id = highestId + 1;
						if(newContact.save(data)){
							contacts.add(newContact);
							ContactManager.dialogRegion.close();
						} else {
							view.triggerMethod("form:data:invalid", newContact.validationError);
						}
					});

					ContactManager.dialogRegion.show(view);
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

				ContactManager.mainRegion.show(contactsListLayout);
			});

		}
	}

});