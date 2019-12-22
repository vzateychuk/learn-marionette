ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){

	List.ContactItemView = Marionette.ItemView.extend({
		tagName: "tr",
		template: "#contact-list-item",

		events: {
			"click": "highlightRow",
			"click button.js-delete": "onDeleteClick",
			"click button.js-edit": function (e) {
				e.stopPropagation();
				console.log("Edit: '" + this.model.escape("firstName") + " " + this.model.escape("lastName") + "'");
			}
		},

		highlightRow: function(e) {
			e.preventDefault();
			this.$el.toggleClass("warning");
		},

		onDeleteClick: function (e) {
			e.stopPropagation();
			console.log("ContactItemView.onDeleteClick. Trigger contact:delete '"
				+ this.model.escape("firstName") + " " + this.model.escape("lastName") + "'");
			this.trigger("contact:delete", this.model)
		}

	});

	List.ContactsView = Marionette.CompositeView.extend({
		tagName: "table",
		className: "table table-hover",
		template: "#contact-list",
		itemView: List.ContactItemView,
		itemViewContainer: "tbody"
	});
	
});