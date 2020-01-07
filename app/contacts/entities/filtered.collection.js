ContactManager.module("Entities",
	function(Entities, ContactManager, Backbone, Marionette, $, _) {
	Entities.FilteredCollection = function(options) {
		var original = options.collection; // storing a reference to the original collection (containing all of the unfiltered model instances) in the original variable
		var filtered = new original.constructor(); // creating a filtered collection that will hold our filtered models (line 5). We call the original collection’s constructor, in case it defined some custom behavior;
		filtered.add(original.models); // add all of the models in the original collection to the filtered collection
		filtered.filterFunction = options.filterFunction; // for later use. Attaching it to the filtered object instance gives us the option to specify the filtering method after initializing our filtered collection

		var applyFilter = function(filterCriterion, filterStrategy, coll) {
			var collection = original || coll; // use the original/incoming collection as the source containing the unfiltered models;
			var criterion;
			// adapt the filter criterion: if we’re going to use our custom filterFunction, we remove any whitespace from the term. If we’re just going to proxy where , leave the criterion intact;
			if (filterStrategy === "filter") {
				criterion = filterCriterion.trim();
			} else {
				criterion = filterCriterion;
			}

			var items = [];
			if (criterion) { // if we have a filtering criterion
				if (filterStrategy === "filter") {
					// if we want to filter using the provided filterFunction we generate a filtering function for our criterion
					var filterFunction = filtered.filterFunction(criterion);
					items = collection.filter(filterFunction);  // we filter our collection using the filtering function
				} else {
					// otherwise, we’re just proxying for the collection’s own where implementation
					items = collection.where(criterion);
				}
			} else {
				// if there’s no filtering criterion, just return all of the unfiltered models from the collection
				items = collection.models;
			}
			// store current criterion for future reference
			filtered._currentCriterion = criterion;

			return items;
		};

		filtered.filter = function (filterCriterion) {
			filtered._currentFilter = "filter";
			var items = applyFilter(filterCriterion, "filter");
			// reset the filtered collection with the new items
			filtered.reset(items);
			return filtered;
		};

		filtered.where = function(filterCriterion) {
			filtered._currentFilter = "where";
			var items = applyFilter(filterCriterion, "where");
			// reset the filtered collection with the new items
			filtered.reset(items);
			return filtered;
		};

		// Adapt the filtered list if the original collection gets its models reset
		original.on("reset", function(){
			var items = applyFilter(filtered._currentCriterion, filtered._currentFilter);

			// reset the filtered collection with the new items
			filtered.reset(items);
		});

		// When new models are added to the original collection, filter the new models and add the ones that match the filtering criterion
		original.on("add", function(models){
			var coll = new original.constructor();
			coll.add(models);
			var items = applyFilter(filtered._currentCriterion, filtered._currentFilter, coll);
			filtered.add(items);
		});
		return filtered;
	};

});