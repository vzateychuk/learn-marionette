ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){

	List.ContactItemView = Marionette.ItemView.extend({
		tagName: "tr",
		template: "#contact-list-item",

		events: {
			// "click": "onRowClick",
			"click button.js-delete": "onDeleteClick",
			"click td a.js-show": "showClicked",
			"click button.js-edit": function (e) {
				e.stopPropagation();
				console.log("Edit: '" + this.model.escape("firstName") + " " + this.model.escape("lastName") + "'");
			}
		},

		onRowClick: function() {
			console.log("ContactItemView.onRowClick. Trigger contact:highlight '"
				+ this.model.escape("firstName") + " " + this.model.escape("lastName") + "'");
			this.trigger("contact:highlight", this.model);
//			this.$el.toggleClass("warning");
		},

		onDeleteClick: function (e) {
			e.stopPropagation();
			console.log("ContactItemView.onDeleteClick. Trigger contact:delete '"
				+ this.model.escape("firstName") + " " + this.model.escape("lastName") + "'");
			this.trigger("contact:delete", this.model)
		},

		showClicked: function(e){
			e.preventDefault();
			e.stopPropagation();
			this.trigger("contact:show", this.model);
		},

		remove: function(){
			var self = this;
			this.$el.fadeOut(function(){
				Marionette.ItemView.prototype.remove.call(self);
			});
		}

	});

	List.ContactsView = Marionette.CompositeView.extend({
		tagName: "table",
		className: "table table-hover",
		template: "#contact-list",
		itemView: List.ContactItemView,
		itemViewContainer: "tbody",

		onItemviewContactDelete: function(){
			this.$el.fadeOut(1000, function(){
				$(this).fadeIn(1000);
			});
		}
	});
	
});