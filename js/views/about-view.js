/* global define: true */

define(["backbone", "text!about-view-template"], function(Backbone, AboutViewTemplate) {
  "use strict";

  var AboutView = Backbone.View.extend({
    render: function() {
      this.$el.html(AboutViewTemplate);
    }
  });

  return AboutView;
});