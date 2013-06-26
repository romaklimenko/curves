/* global define: true */

define(
  [
    "backbone",
    "day-model",
    "days-collection",
    "chart-view",
    "text!data"
  ],
  function(Backbone, DayModel, DaysCollection, ChartView, Data) {

    var initialize = function() {
      console.log("initialize");

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
      console.log(days);
    }

    return {
      initialize: initialize
    };
  }
)