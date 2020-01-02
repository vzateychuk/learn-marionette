ContactManager.module("Common.Views", function(Views, ContactManager, Backbone, Marionette, $, _)
{
	Views.LoadingView = Marionette.ItemView.extend({
		template: "#loading-view",

		initialize: function(options){
			var opt = options || {};
			this.title = opt.title || "Loading (Default Title)";
			this.message = opt.message || "Please wait, data is loading.... (Default message)";
		},
		// Marionette calls the serializeData function to provide data to the template; we can write our own version to provide these new attributes
		serializeData: function() {
			return {
				title: this.title,
				message: this.message
			}
		},

		onShow: function() {
			console.log("--> Hi from Views.Loading, spinner=" + $("#spinner"));
		}
	});
});