/* global define: true */
/* global describe: true */
/* global it: true */

define(["main", "../../js/vendor/chai.js", "day-model", "days-collection"],
  function(Main, Chai, DayModel, DaysCollection) {
    "use strict";

    var assert = Chai.assert;

    describe("DaysCollection", function() {
      describe("#complement()", function() {
        it("adds missed days from lesser date till today", function() {
          var dayModel1 = new DayModel({ date: "20130101" });
          var dayModel3 = new DayModel({ date: "20130103" });

          var daysCollection = new DaysCollection();
          daysCollection.add([dayModel1, dayModel3]);

          daysCollection.complement();

          var now = new Date();
          now.setMilliseconds(0);
          now.setMinutes(0);
          now.setHours(0);

          assert.equal(
            daysCollection.length,
            Math.round((now - dayModel1.getDate()) / 1000 / 60 / 60 / 24));
        });

        it("should be sorted if complemented", function() {
          var dayModel1 = new DayModel({ date: "20130101" });
          var dayModel3 = new DayModel({ date: "20130103" });

          var daysCollection = new DaysCollection();
          daysCollection.add([dayModel1, dayModel3]);

          daysCollection.complement();

          var now = new Date();
          now.setMilliseconds(0);
          now.setMinutes(0);
          now.setHours(0);

          var previousDate = new Date("1970-01-01");
          var nextDate;

          for (var i = 0; i < daysCollection.models.length; i++) {
            nextDate = daysCollection.models[i].getDate();
            assert.isTrue(previousDate < nextDate);
            previousDate = nextDate;
          }
        });
      });
    });
  }
);