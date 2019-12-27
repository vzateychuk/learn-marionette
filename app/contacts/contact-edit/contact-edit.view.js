ContactManager.module("ContactsApp.Edit", function(Edit, ContactManager, Backbone, Marionette, $, _)
{

	Edit.ContactView = Marionette.ItemView.extend({
		template: "#contact-edit"
	});

});