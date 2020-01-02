ContactManager.module("ContactsApp.Edit", function(Edit, ContactManager, Backbone, Marionette, $, _)
{

	Edit.ContactView = Marionette.ItemView.extend({
		template: "#contact-edit",

		events: {
			"click button.js-submit": "submitClicked"
		},

		submitClicked: function(e){
			e.preventDefault();
			console.log("--> edit contact");
			var data = Backbone.Syphon.serialize(this);
			this.trigger("form:submit", data);
		}
	});

	Edit.MissingContact = Marionette.ItemView.extend({
		template: "#missing-contact-view"
	});

});