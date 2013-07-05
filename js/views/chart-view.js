/* global define: true */

define(["backbone"], function(Backbone) {
  "use strict";

  var ChartView = Backbone.View.extend({
    render: function() {
      this.$el.html("<h1>Welcome to ChartView</h1>");
      for (var i = 0; i < this.options.days.models.length; i++) {
        this.$el.append(i);
      }
    }
  });

  return ChartView;
});