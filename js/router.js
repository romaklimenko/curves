/* global define: true */

define(
  [
    "backbone",
    "jquery",
    "default-view",
    "about-view"
  ],
  function(
    Backbone,
    $,
    DefaultView,
    AboutView) {

    "use strict";

    var Router = Backbone.Router.extend({
      routes: {
        "":  "default",
        "about": "about"
      },

      initialize: function() {
        Backbone.history.start();
      },

      default: function() {
        var defaultView = new DefaultView({
          el: $("#app")
        });
        defaultView.render();
      },

      about: function() {
        var aboutView = new AboutView({ el: $("#app") });
        aboutView.render();
      }
    });

    var router = new Router();

    return router;
  }
);