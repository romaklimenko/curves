/* global define: true */
/* global _: true */

define(["jquery", "backbone", "raphael"], function($, Backbone, Raphael) {
  "use strict";

  var ChartView = Backbone.View.extend({

    // the step between two movable points in x-axis
    // so circle radius around every single movable point should be
    // <= this.step / 2
    minimalColumnWidth: 100,

    initialize: function() {
      this.initialModels = this.options.models;
      this.initialModels.complement();
    },

    height: function() {
      return this.$el.height();
    },

    width: function() {
      return this.$el.width();
    },

    render: function() {
      if (this.el === undefined) {
        return;
      }

      if (this.paper !== undefined) {
        this.paper.remove();
      }

      this.$el.empty();

      this.paper = new Raphael(this.el, this.width(), this.height());

      this.models = this.initialModels.shrink(
        Math.floor(this.width() / this.minimalColumnWidth));

      _.each(this.models.models, function(m) {
        m.set("valuePerVisit", m.getValuePerVisit());
      });

      this.columnWidth = Math.floor(this.width() / this.models.length);

      this.renderPath(
        this.paper.valuesPath,
        "value",
        "#FAD500");

      this.renderPath(
        this.paper.visitsPath,
        "visits",
        "#4892D2");

      this.renderPath(
        this.paper.valuePerVisitPath,
        "valuePerVisit",
        "#4CB849");
    },

    getAnchors: function(p1x, p1y, p2x, p2y, p3x, p3y) {
      var a, alpha, b, dx1, dx2, dy1, dy2, l1, l2;
      l1 = (p2x - p1x) / 2;
      l2 = (p3x - p2x) / 2;
      a = Math.atan((p2x - p1x) / Math.abs(p2y - p1y));
      b = Math.atan((p3x - p2x) / Math.abs(p2y - p3y));
      if (p1y < p2y) {
        a = Math.PI - a;
      }
      if (p3y < p2y) {
        b = Math.PI - b;
      }
      alpha = Math.PI / 2 - ((a + b) % (Math.PI * 2)) / 2;
      dx1 = l1 * Math.sin(alpha + a);
      dy1 = l1 * Math.cos(alpha + a);
      dx2 = l2 * Math.sin(alpha + b);
      dy2 = l2 * Math.cos(alpha + b);
      return {
        x1: p2x - dx1,
        y1: p2y + dy1,
        x2: p2x + dx2,
        y2: p2y + dy2
      };
    },

    renderPath: function(path, attribute, color) {
      var X, X0, X2, Y, Y0, Y2, a, p, x, y;
      X = this.width() / this.models.models.length;

      var max = Math.floor(
        _.max(
          this.models.models,
          function(model) {
            return parseInt(model.get(attribute), 10);
          }).get(attribute) * 1.5);

      Y = this.height() / max;

      if (path !== undefined && path.remove !== undefined) {
        path.remove();
      }

      path = this.paper.path().attr({

        stroke: color,
        "stroke-width": 4,
        "stroke-linejoin": "round"
      });

      for (var i = 0; i < this.models.models.length; i++) {
        y = Math.round(this.height() - 20 - Y * this.models.models[i].get(attribute));
        x = Math.round(X * (i + 0.5));
        if (i === 0) {
          p = ["M", x, y, "C", x, y];
        }
        else if (i !== 0 && i < this.models.models.length - 1) {
          Y0 = Math.round(this.height() - 20 - Y * parseInt(this.models.models[i - 1].get(attribute), 10));
          X0 = Math.round(X * (i - 0.5));
          Y2 = Math.round(this.height() - 20 - Y * parseInt(this.models.models[i + 1].get(attribute), 10));
          X2 = Math.round(X * (i + 1.5));
          a = this.getAnchors(X0, Y0, x, y, X2, Y2);
          p = p.concat([a.x1, a.y1, x, y, a.x2, a.y2]);
        }

        this.paper.circle(x, y, 5).attr(
          {
            cursor: "move",
            fill: "#FFF",
            stroke: color,
            "stroke-width": 3,
            "title": "Visits: " + this.models.models[i].get("visits") +
              "\nValue: " + this.models.models[i].get("value") +
              "\nValue per Visit: " + this.models.models[i].get("valuePerVisit")
          });
      }
      p = p.concat([x, y, x, y]);
      path.attr({
        path: p
      });
    },
  });

  return ChartView;
});