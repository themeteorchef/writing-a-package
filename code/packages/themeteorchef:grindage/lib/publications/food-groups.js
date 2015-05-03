Meteor.publish('foodGroups', function() {
  var foodGroups = FoodGroups.find();
  
  if ( foodGroups ) {
    return foodGroups;
  }

  return this.ready();
});
