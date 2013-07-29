/* global define: true */

define(
  ["backbone", "text!test-view-template"],
  function(Backbone, TestViewTemplate) {
  "use strict";

  var TestView = Backbone.View.extend({
    render: function() {
      this.$el.html(TestViewTemplate);
    }
  });

  return TestView;
});