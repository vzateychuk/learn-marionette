ContactManager.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _) {

	Entities.Contact = Backbone.Model.extend({
		urlRoot: "contacts",
		defaults: {
			"phoneNumber" : "No phone number!"
		}
	});

	Entities.configureStorage(Entities.Contact);

	Entities.ContactCollection = Backbone.Collection.extend({
		url: "contacts",
		model: Entities.Contact,
		comparator: "firstName"
	});

	Entities.configureStorage(Entities.ContactCollection);

	var contacts;

	var initializeContacts = function () {
		contacts = new Entities.ContactCollection([
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
		]);

		contacts.forEach( function(contact) {
			contact.save();
		});

		return contacts;
	};

	var API = {
		getContactEntities: function(){
			var contacts = new Entities.ContactCollection();
			contacts.fetch();
			if (contacts.length === 0) {
				return initializeContacts();
			} else {
				return contacts;
			}
		}

};

	// Register invocation 'ContactManager.request("contact:entities");' return list of the contacts
	ContactManager.reqres.setHandler("contact:entities", function(){
		return API.getContactEntities();
	});

});
