ContactManager.module("ContactsApp.Edit", function(Edit, ContactManager, Backbone, Marionette, $, _){

	Edit.Controller = {
		editContact: function(model) {
			console.log("showContact called for model ", model)
			var contactView = new Edit.ContactView({
				model: model
			});

			ContactManager.mainRegion.show(contactView);
		}
	}

});