/* global define: true */

define(["backbone"], function(Backbone) {
  "use strict";

  var AboutView = Backbone.View.extend({
    render: function() {
      this.$el.html("<h1>Welcome to AboutView</h1>");
    }
  });

  return AboutView;
});