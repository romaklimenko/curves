/* global define: true */

define(["jquery", "backbone", "raphael"], function($, Backbone, Raphael) {
  "use strict";

  var paper;

  var ChartView = Backbone.View.extend({

    render: function() {
      if (this.el === undefined) {
        return;
      };

      this.$el.empty();
      this.paper = new Raphael(this.el, this.$el.width(), this.$el.height());
    },
  });

  return ChartView;
});