/* global require: true */
/* global requirejs: true */

requirejs.config({
  paths: {
    // vendor
    "backbone": "./vendor/backbone",
    "d3": "./vendor/d3",
    "jquery": "./vendor/jquery",
    "underscore": "./vendor/underscore",

    // plugins
    "text": "./vendor/text",

    // resources
    "data": "../json/data.json",

    // entry point
    "app": "../app",

    // router
    "router": "../router",

    // models
    "day-model": "./models/day-model",

    // collections
    "days-collection": "./collections/days-collection",

    // views
    "default-view": "./views/default-view",
    "about-view": "./views/about-view",
    "chart-view": "./views/chart-view"
  },
  shim: {
    "backbone": {
      deps: ["underscore"],
      exports: "Backbone"
    },
    "d3": {
      exports: "d3"
    },
    "jquery": {
      exports: "$"
    },
    "underscore": {
      exports: "_"
    }
  }
});

require(
  [
    "jquery",
    "app"
  ],
  function($, App) {
    "use strict";

    if ($("#mocha").length > 0){
      return;
    }

    App.initialize();
  }
);