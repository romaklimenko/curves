/* global define: true */

define(
  [
    "backbone",
    "jquery",
    "day-model",
    "days-collection",
    "text!data",
    "text!default-view-template",
    "chart-view"
  ],
  function(
    Backbone,
    $,
    DayModel,
    DaysCollection,
    Data,
    DefaultViewTemplate,
    ChartView) {

    "use strict";

    var DefaultView = Backbone.View.extend({
      render: function() {
        this.$el.html(DefaultViewTemplate);

        var days = new DaysCollection();

        var data = JSON.parse(Data);

        for (var i = 0; i < data.length; i++) {
          days.add(
            new DayModel({
              date: data[i].date,
              visits: data[i].visits,
              value: data[i].value
            })
          );
        }

        var chartView = new ChartView({
          el: $("#chart"),
          days: days
        });
        chartView.render();
      }
    });

    return DefaultView;
  }
);