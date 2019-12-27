ContactManager.module("ContactsApp.Edit", function(Edit, ContactManager, Backbone, Marionette, $, _){

	Edit.Controller = {
		editContact: function(id) {
			console.log("showContact called for id: ", id);
			var contacts = ContactManager.request("contact:entities");
			var model = contacts.get(id);
			var contactView;
			if (model !==undefined) {
				contactView = new Edit.ContactView({
					model: model
				});
			} else {
				contactView = new Edit.MissingContact();
			}

			ContactManager.mainRegion.show(contactView);
		}
	}

});