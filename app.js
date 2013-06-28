/* global define: true */

define(
  [
    "backbone",
    "router",
    "day-model",
    "days-collection",
    "chart-view",
    "text!data"
  ],
  function(Backbone, Router, DayModel, DaysCollection, ChartView, Data) {

    var initialize = function() {

      var days = new DaysCollection();

      var data = JSON.parse(Data);

      for (var i = 0; i < data.length; i++) {
        days.add(
          new DayModel(
            {
              date: data[i].date,
              visits: data[i].visits,
              value: data[i].value
            }));
      };
    }

    return {
      initialize: initialize
    };
  }
)