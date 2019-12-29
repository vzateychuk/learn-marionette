ContactManager.module("ContactsApp.Entities", function(Entities, ContactManager, Backbone, Marionette, $, _)
{
	var findStorageKey = function(entity) {
		if (entity.urlRoot) {
			// use a model's urlRoot value
			return _.result(entity, "urlRoot");
		} else if(entity.url){
			// use a collection's url value
			return _.result(entity, "url");
		} else if(entity.collection && entity.collection.url){
			// fallback to obtaining a model's storage key from the collection it belongs to
			return _.result(entity.collection, "url");
		} else {
			throw new Error("Unable to determine storage key");
		}
	};

	var StorageMixin = function(entityPrototype){
		var storageKey = findStorageKey(entityPrototype);
		return {
			localStorage: new Backbone.LocalStorage(storageKey)
		};
	};

	Entities.configureStorage = function(entity){
		_.extend( entity.prototype, new StorageMixin(entity.prototype) );
	};
});