ContactManager.module("ContactsApp.Edit", function(Edit, ContactManager, Backbone, Marionette, $, _)
{

	Edit.ContactView = Marionette.ItemView.extend({
		template: "#contact-edit",

		events: {
			"click button.js-submit": "submitClicked"
		},

		submitClicked: function(e){
			e.preventDefault();

			var $view = this.$el;
			var clearFormErrors = function(){
				var $form = $view.find("form");
				$form.find(".help-inline.error").each(function(){
					$(this).remove();
				});
				$form.find(".control-group.error").each(function(){
					$(this).removeClass("error");
				});
			};

			clearFormErrors();
			var data = Backbone.Syphon.serialize(this);
			this.trigger("form:submit", data);
		},

		// Remember that triggerMethod 138 will automatically execute a function whose name corresponds to the event
		// Therefore this method will be executed on the 'form:data:invalid' event (see controller)
		onFormDataInvalid: function(errors){
			console.log("invalid form data: ", errors);
			var $view = this.$el;

			var markErrors = function(value, key){
				var $controlGroup = $view.find("#contact-" + key).parent();
				var $errorEl = $("<span>", {class: "help-inline error", text: value});
				$controlGroup.append($errorEl).addClass("error");
			};

			_.each(errors, markErrors);
		}
	});

	Edit.MissingContact = Marionette.ItemView.extend({
		template: "#missing-contact-view"
	});

});