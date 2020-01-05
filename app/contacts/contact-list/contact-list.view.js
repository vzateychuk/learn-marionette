ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){
	List.Layout = Marionette.Layout.extend({
		template: "#contact-list-layout",

		regions: {
			panelRegion: "#panel-region",
			contactsRegion: "#contacts-region"
		}
	});

	List.Panel = Marionette.ItemView.extend({
		template: "#contact-list-panel",

		triggers: {
			"click button.js-new": "contact:new"
		}
	});

	List.ContactItemView = Marionette.ItemView.extend({
		tagName: "tr",
		template: "#contact-list-item",

		events: {
			// "click": "onRowClick",
			"click button.js-delete": "onDeleteClick",
			"click td a.js-edit": "onEditClick",
			"click button.js-edit": "onEditClick"
		},

		onDeleteClick: function (e) {
			e.stopPropagation();
			console.log("ContactItemView.onDeleteClick. Trigger contact:delete '"
				+ this.model.escape("firstName") + " " + this.model.escape("lastName") + "'");
			this.trigger("contact:delete", this.model)
		},

		onEditClick: function(e){
			e.preventDefault();
			e.stopPropagation();
			this.trigger("contact:edit", this.model);
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