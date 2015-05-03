Router.route("grindage", {
  path: "/grindage",
  template: "grindage",
  subscriptions: function() {
    return Meteor.subscribe('foodGroups');
  }
});
