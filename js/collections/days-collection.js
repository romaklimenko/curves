/* global define: true */

define(["backbone", "underscore", "day-model"], function(Backbone, _, DayModel) {
  "use strict";

  var DaysCollection = Backbone.Collection.extend({

    model: DayModel,

    comparator: function(dayModel) {
      return dayModel.get("date");
    },

    complement: function() {
      var minDayModel = _.min(this.models, function(model) {
        return model.getDate();
      });

      var minDayModelDate = minDayModel.getDate();

      var date = minDayModelDate;
      var sqlDateStringToday = DayModel.dateToSqlDateString(new Date());
      var today = DayModel.sqlDateStringToDate(sqlDateStringToday);

      while (minDayModelDate < today && minDayModelDate < Date.now()) {
        var model = this.get(DayModel.dateToSqlDateString(date));
        if (model === undefined) {
          this.add(
            new DayModel({
              date: DayModel.dateToSqlDateString(date)
            }));
        }
        date.setDate(date.getDate() + 1);
      }
    }
  });

  return DaysCollection;
});