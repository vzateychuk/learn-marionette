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
		},

		// Remember that triggerMethod 138 will automatically execute a function whose name corresponds to the event
		// Therefore this method will be executed on the 'form:data:invalid' event (see controller)
		onFormDataInvalid: function(errors){
			console.log("invalid form data: ", errors);
		}
	});

	Edit.MissingContact = Marionette.ItemView.extend({
		template: "#missing-contact-view"
	});

});