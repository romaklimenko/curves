/* global define: true */

define(["backbone"], function(Backbone) {
  "use strict";

  var DefaultView = Backbone.View.extend({
    tagName: "div",

    render: function() {
      this.$el.html('<h1>Welcome to DefaultView</h1>');
    }
  });

  return DefaultView;
});