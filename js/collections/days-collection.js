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
    },

    shrink: function(length) {
      var step = Math.floor(this.length / length);

      if (this.length / length > step) {
        step++;
      };

      var result = new DaysCollection();

      var model;

      for (var i = 0; i < this.length; i++) {
        if (i === 0 || i % step === 0) {
          var span = _.first(_.rest(this.models, i), step);

          model = new DayModel({
            date: this.models[i].get("date"),
            visits: Math.floor(_.reduce(span, function(memo, dayModel) {
                return memo + dayModel.get("visits");
              }, 0) / span.length),
            value: Math.floor(_.reduce(span, function(memo, dayModel) {
                return memo + dayModel.get("value");
              }, 0) / span.length)
          });

          result.add(model);
        };
      };
      return result;
    }
  });

  return DaysCollection;
});