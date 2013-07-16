/* global define: true */
/* global window: true */

define(
  [
    "backbone",
    "jquery",
    "day-model",
    "days-collection",
    "text!all",
    "text!campaign",
    "text!default-view-template",
    "chart-view"
  ],
  function(
    Backbone,
    $,
    DayModel,
    DaysCollection,
    AllData,
    CampaignData,
    DefaultViewTemplate,
    ChartView) {

    "use strict";

    var DefaultView = Backbone.View.extend({

      render: function() {
        this.$el.html(DefaultViewTemplate);

        // all
        var allDays = new DaysCollection();

        var allData = JSON.parse(AllData);

        for (var i = 0; i < allData.length; i++) {
          allDays.add(
            new DayModel({
              date: allData[i].date,
              visits: allData[i].visits,
              value: allData[i].value
            })
          );
        }

        // campaign
        var campaignDays = new DaysCollection();

        var campaignData = JSON.parse(CampaignData);

        for (var i = 0; i < campaignData.length; i++) {
          campaignDays.add(
            new DayModel({
              date: campaignData[i].date,
              visits: campaignData[i].visits,
              value: campaignData[i].value
            })
          );
        }

        var topChartView = new ChartView({
          el: $("#default-view-top-chart"),
          days: allDays
        });

        var bottomChartView = new ChartView({
          el: $("#default-view-bottom-chart"),
          days: campaignDays
        });

        $(window).resize(function() {
          topChartView.render();
          bottomChartView.render();
        });

        topChartView.render();
        bottomChartView.render();
      }
    });

    return DefaultView;
  }
);