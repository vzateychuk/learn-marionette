ContactManager.module("ContactsApp.New",
	function(New, ContactManager, Backbone, Marionette, $, _) {
	New.ContactView = ContactManager.ContactsApp.Common.Views.Form.extend({
		title: "New Contact",

		onRender: function(){
			this.$(".js-submit").text("Create contact");
		}
	});
});