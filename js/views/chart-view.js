/* global define: true */
/* global _: true */

define(["jquery", "backbone", "raphael"], function($, Backbone, Raphael) {
  "use strict";

  var ChartView = Backbone.View.extend({

    paths: {},

    pointsInLine: 10,

    margin: 20,

    initialize: function() {
      this.options.models.complement();
      this.collection = this.options.models.shrink(this.pointsInLine);
    },

    height: function() {
      return this.$el.height() - this.margin;
    },

    width: function() {
      return this.$el.width();
    },

    render: function() {
      var chartView = this;

      if (chartView.el === undefined) {
        return;
      }

      if (chartView.paper !== undefined) {
        chartView.paper.remove();
      }

      chartView.$el.empty();

      chartView.paper = new Raphael(chartView.el, chartView.$el.width(), chartView.$el.height());

      chartView.columnWidth = Math.floor(chartView.$el.width() / chartView.collection.length);

      chartView.renderPaths({ dots: true });
    },

    removePath: function(pathName) {
      var chartView = this;

      var path = chartView[pathName];

      if (path !== undefined && path.remove !== undefined) {
        path.remove();
      }
    },

    renderPaths: function(options) {
      var dots = (options !== undefined && options.dots);

      var chartView = this;

      // visits
      chartView.renderPath(
        "visitsPath",
        {
          color: "#4892D2",
          cursor: "move",
          "stroke-width": 4
        },
        function(model) {
          return Math.floor(parseInt(model.get("visits"), 10));
        },
        !dots ? undefined : function(model, visits) {
          model.set("visits", visits);
        });

      // value
      chartView.renderPath(
        "valuesPath",
        {
          color: "#FAD500",
          cursor: "move",
          "stroke-width": 4
        },
        function(model) {
          return Math.floor(parseInt(model.get("value"), 10));
        },
        !dots ? undefined : function(model, value) {
          model.set("value", value);
        });

      // value per visit
      chartView.renderPath(
        "valuePerVisitPath",
        {
          color: "#4CB849",
          cursor: "hand",
          "stroke-width": 2
        },
        function(model) {
          var visits = parseInt(model.get("visits"), 10);
          var value = parseInt(model.get("value"), 10);
          if (visits > 0) {
            return Math.floor(value / visits);
          }
          else {
            return 0;
          }
        }
      );
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

    renderPath: function(pathName, attributes, getter, setter) {
      var X0, X2, Y, Y0, Y2, a, p, x, y;

      var chartView = this;

      var X = chartView.width() / chartView.collection.models.length;

      var max =
        getter(_.max(
          chartView.collection.models,
          function(model) {
            return parseInt(getter(model), 10);
          }));

      var maxModelAttributeValue = max * 1.5;

      Y = chartView.height() / maxModelAttributeValue;

      var path = chartView.paper.path().attr({
        stroke: attributes.color,
        "stroke-width": attributes["stroke-width"],
        "stroke-linejoin": "round"
      });

      for (var i = 0; i < chartView.collection.models.length; i++) {

        var prevModel = chartView.collection.models[i - 1];
        var model = chartView.collection.models[i];
        var nextModel = chartView.collection.models[i + 1];

        y = Math.round(chartView.height() - Y * getter(model));
        x = Math.round(X * (i + 0.5));
        if (i === 0) {
          p = ["M", x, y, "C", x, y];
        }
        else if (i !== 0 && i < chartView.collection.models.length - 1) {
          Y0 = Math.round(
            chartView.height() - Y * parseInt(getter(prevModel), 10));
          X0 = Math.round(X * (i - 0.5));
          Y2 = Math.round(
            chartView.height() - Y * parseInt(getter(nextModel), 10));
          X2 = Math.round(X * (i + 1.5));
          a = chartView.getAnchors(X0, Y0, x, y, X2, Y2);
          p = p.concat([a.x1, a.y1, x, y, a.x2, a.y2]);
        }

        if (setter !== undefined) {
          chartView.renderDot(x, y, i, attributes, model, Y, setter);
        }
      }
      p = p.concat([x, y, x, y]);

      path.attr({
        path: p
      }).toBack();

      chartView[pathName] = path;
    },

    renderDot: function(x, y, i, attributes, model, Y, setter) {
      var chartView = this;

      var currentY;

      chartView.paper
        .circle(x, y, 5)
        .data("models-i", i)
        .attr(
        {
          cursor: attributes.cursor,
          fill: "#FFF",
          stroke: attributes.color,
          "stroke-width": 3,
          "title": "Visits: " + model.get("visits") +
            "\nValue: " + model.get("value") +
            "\nValue per Visit: " +
              model.getValuePerVisit()
        })
        .drag(
          //onmove
          function(dx, dy) {
            var attributeValue = Math.floor((chartView.height() - (currentY + dy)) / Y);
            setter(chartView.collection.models[this.data("models-i")], attributeValue);
            this.attr("cy", Math.round(chartView.height() - Y * attributeValue));

            chartView.removePath("visitsPath");
            chartView.removePath("valuesPath");
            chartView.removePath("valuePerVisitPath");

            chartView.renderPaths({ dots: false });
          },
          //onstart
          function() {
            currentY = this.attr("cy");
          },
          // onend
          function() {
            chartView.render();
          })
        .toBack();
    }
  });

  return ChartView;
});