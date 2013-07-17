/* global define: true */

define(["jquery", "backbone", "raphael"], function($, Backbone, Raphael) {
  "use strict";

  var ChartView = Backbone.View.extend({

    // the step between two movable points in x-axis
    // so circle radius around every single movable point should be
    // <= this.step / 2
    step: 10,

    initialize: function() {
      this.options.models.complement();
    },

    render: function() {
      if (this.el === undefined) {
        return;
      };

      this.$el.empty();
      if (this.paper !== undefined) {
        this.paper.remove();
      };
      this.paper = new Raphael(this.el, this.$el.width(), this.$el.height());

      this.renderDots();
    },

    renderDots: function() {
      this.models = this
        .options
        .models
        .shrink(Math.floor(this.$el.width() / this.step));

      var _step = Math.floor(this.$el.width() / this.models.length);

      this.maxVisits = _.max(this.models.models, function(model) {
        return model.get("visits");
      }).get("visits");

      for (var i = 0; i < this.models.length; i++) {
        var coordinates =
          {
            x: _step * i,
            y: this.$el.height() - Math.floor(
              this.$el.height() / this.maxVisits * this.models.models[i].get("visits"))
          };

        this.paper.circle(coordinates.x, coordinates.y, 2).attr(
          {
            fill: "#76ABD6",
            stroke: "#76ABD6",
            "stroke-width": 1
          });
      };
    }
  });

  return ChartView;
});