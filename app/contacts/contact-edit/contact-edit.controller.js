ContactManager.module("ContactsApp.Edit", function(Edit, ContactManager, Backbone, Marionette, $, _){

	Edit.Controller = {
		editContact: function(id) {
			console.log("Edit.Controller: showContact called for id=", id);

			var loadingView = new ContactManager.Common.Views.LoadingView();
			ContactManager.mainRegion.show(loadingView);

			var contactPromise = ContactManager.request("contact:entity", id);
			$.when(contactPromise)
				.done( function(contact) {
					var contactView;
					console.log("Edit.Controller: resolved contactPromise, creating view for=", contact);
					if (contact !== undefined) {
						contactView = new Edit.ContactView({
							model: contact
						});
					} else {
						contactView = new Edit.MissingContact();
					}
					ContactManager.mainRegion.show(contactView);
				});
		}
	}

});