/* global define: true */

define(
  [
    "backbone",
    "jquery",
    "default-view",
    "about-view",
    "test-view"
  ],
  function(
    Backbone,
    $,
    DefaultView,
    AboutView,
    TestView) {

    "use strict";

    var defaultView;
    var aboutView;
    var testView;

    var Router = Backbone.Router.extend({
      routes: {
        "":  "default",
        "about": "about",
        "test": "test"
      },

      initialize: function() {
        defaultView = new DefaultView({
          el: $("#app-default-view")
        });
        defaultView.render();

        aboutView = new AboutView({
          el: $("#app-about-view")
        });
        aboutView.render();

        testView = new TestView({
          el: $("#app-test-view")
        });
        testView.render();

        Backbone.history.start();
      },

      default: function() {
        $(".app").hide();
        $("#app-default-view").show();
        defaultView.render();
      },

      about: function() {
        $(".app").hide();
        $("#app-about-view").show();
        aboutView.render();
      },

      test: function() {
        $(".app").hide();
        $("#app-test-view").show();
        testView.render();
      }
    });

    var router = new Router();

    return router;
  }
);