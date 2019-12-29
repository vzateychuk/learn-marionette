ContactManager.module("ContactsApp.Edit", function(Edit, ContactManager, Backbone, Marionette, $, _){

	Edit.Controller = {
		editContact: function(id) {
			console.log("showContact called for id: ", id);
			var contact = ContactManager.request("contact:entity", id);
			var contactView;
			if (contact !== undefined) {
				contactView = new Edit.ContactView({
					model: contact
				});
			} else {
				contactView = new Edit.MissingContact();
			}

			ContactManager.mainRegion.show(contactView);
		}
	}

});