ContactManager.module("ContactsApp.Edit", function(Edit, ContactManager, Backbone, Marionette, $, _){

	Edit.Controller = {
		editContact: function(id) {
			console.log("Edit.Controller: showContact called for id=", id);

			var loadingView = new ContactManager.Common.Views.LoadingView({
				title: "Artificial Loading Delay",
				message: "Data loading is delayed to demonstrate using a loading view."
			});
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

						contactView.on("form:submit", function(data){
							contact.save(data);
							console.log("--> ContactController.form:submit. Contact saved.");
						});
					} else {
						contactView = new Edit.MissingContact();
					}
					ContactManager.mainRegion.show(contactView);
				});
		}
	}

});