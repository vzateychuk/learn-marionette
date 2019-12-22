ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){

	List.ContactItemView = Marionette.ItemView.extend({
		tagName: "tr",
		template: "#contact-list-item",

		events: {
			"click td": "alertPhoneNumber"
		},

		alertPhoneNumber: function(){
			console.log("--> alertPhoneNumber: " + this.model.escape("phoneNumber"))
			alert(this.model.escape("phoneNumber"));
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