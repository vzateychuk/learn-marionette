ContactManager.module("ContactModule", function(ContactModule, ContactManager, Backbone, Marionette, $, _) {

	ContactModule.Contact = Backbone.Model.extend({
		defaults: {
			"phoneNumber" : "No phone number!"
		}
	});

	ContactModule.ContactCollection = Backbone.Collection.extend({
		model: ContactModule.Contact,
		comparator: "firstName"
	});

	var contacts;

	var initializeContacts = function () {
		contacts = new ContactModule.ContactCollection([
			{
				id: 1,
				firstName: "Alice",
				lastName: "Arten",
				phoneNumber: "555-0184"
			}, {
				id: 2,
				firstName: "Vlad",
				lastName: "Zat"
			}, {
				id: 3,
				firstName: "Bob",
				lastName: "Brigham",
				phoneNumber: "555-0163"
			},  {
				id: 4,
				firstName: "Charlie",
				lastName: "Campbell",
				phoneNumber: "555-0129"
			},
			{
				id: 5,
				firstName: "Alice",
				lastName: "Tampen"
			},
			{
				id: 6,
				firstName: "Alice",
				lastName: "Artsy"
			}
		])
	};

	var API = {
		getContacts: function(){
			if (contacts === undefined) {
				initializeContacts();
			}
			return contacts;
		}
	};

	// Register invocation 'ContactManager.request("contact:entities");' return list of the contacts
	ContactManager.reqres.setHandler("contact:entities", function(){
		return API.getContacts();
	});

});
