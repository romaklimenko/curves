/* global define: true */

define(
  [
    "backbone",
    "default-view",
    "about-view"
  ],
  function(Backbone, DefaultView, AboutView) {

    var Router = Backbone.Router.extend({
      routes: {
        "":  "default",
        "about": "about"
      },

      initialize: function() {
        Backbone.history.start();
      },

      default: function() {
        var defaultView = new DefaultView();
        defaultView.setElement($("#app"));
        defaultView.render();
      },

      about: function() {
        var aboutView = new AboutView();
        aboutView.setElement($("#app"));
        aboutView.render();
      }
    });

    var router = new Router();

    return router;
  }
);