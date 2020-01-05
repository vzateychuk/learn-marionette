ContactManager.module("ContactsApp.Edit",
	function(Edit, ContactManager, Backbone, Marionette, $, _) {

	Edit.ContactView = ContactManager.ContactsApp.Common.Views.Form.extend({
		initialize: function () {
			this.title = "Edit " + this.model.get("firstName");
			this.title += " " + this.model.get("lastName");
		}
	});
});