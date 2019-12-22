ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){

	List.ContactItemView = Marionette.ItemView.extend({
		tagName: "tr",
		template: "#contact-list-item",

		events: {
			"click": "highlightRow",
			"click td": "displayCellContent"
		},

		highlightRow: function(e) {
			e.preventDefault();
			this.$el.toggleClass("warning");
		},

		displayCellContent: function(e){
			e.preventDefault();
			console.log("--> displayCellContent: " + e.target.textContent);
			// alert(this.model.escape("phoneNumber"));
			// alert(this.$el.text());
			// alert($(e.target).text())
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