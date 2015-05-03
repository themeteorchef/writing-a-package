/**
* themeteorchef:grindage
* A tool for checking whether Stoney thinks our food group is legit.
*
* @see {@link https://github.com/themeteorchef/grindage|Grindage on GitHub}
* @license MIT
*/

/**
* @function Grindage
* @public
*
* Takes the passed food group and checks whether it's valid.
*
* @param {string} foodGroup - The name of the food group to test.
*/
Grindage = function( foodGroup ) {
  if ( foodGroup ) {
    var groupExists = _loopFoodGroups( foodGroup.toLowerCase() );
    groupExists ? _wheezTheJuice( foodGroup ) : _dontWheezTheJuice( foodGroup );
  } else {
    alert("Need a food group, buddddy.");
  }
};

/**
* @type {Array.<Object>}
* @private
*
* Contains an array of valid food group objects.
*/
var _getFoodGroups = function() {
  var getFoodGroups = FoodGroups.find( {}, { fields: { "_id": 1 } } ).fetch();
  return getFoodGroups;
}

/**
* @function _loopFoodGroups
* @private
*
* Loops the _foodGroups array and calls _foodGroupExists on the passed item.
*
* @param {string} foodGroup - The name of the food group to find in the _foodGroups array.
*/
var _loopFoodGroups = function( foodGroup ) {
  var groups = _getFoodGroups();
  for( var i = 0; i < groups.length; i++ ) {
    return _checkIfFoodGroupExists( foodGroup ) ? true : false;
  }
};

/**
* @function _checkIfFoodGroupExists
* @private
*
* Loops the _foodGroups array and calls _foodGroupExists on the passed item.
*
* @param {string} foodGroup - {}, {fields: {}The name ;of the food group to find in the _foodGroups array.
*/
var _checkIfFoodGroupExists = function( foodGroup ) {
  return FoodGroups.findOne({"name": foodGroup});
};

/**
* @function _wheezTheJuice
* @private
*
* Logs a positive message that says "Wheeze the juice!"
*/
var _wheezTheJuice = function( foodGroup ) {
  alert("Wheez the juice! " + foodGroup + " exists!");
};

/**
* @function _wheezTheJuice
* @private
*
* Logs an error message that says "No wheezing the juice!"
*/
var _dontWheezTheJuice = function( foodGroup ) {
  alert("No wheezing the juice! " + foodGroup + " does not exist.");
};
