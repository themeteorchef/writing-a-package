Tinytest.add('Can we see our default food groups in the database on the server?', function( test ) {
  // Setup
  // Here we take the list of groups that we insert into our database on startup
  // from our /lib/startup.js file.
  var groups = [
    { name: "dairy",     example: "Milk Duds" },
    { name: "fruit",     example: "SweetTarts" },
    { name: "vegetable", example: "Corn Nuts" },
    { name: "meat",      example: "Burrito" }
  ];

  // Execute
  // Here we run a loop over our array of groups, storing the group name in a
  // variable along with a findOne call to lookup a document with that name in
  // the database. This should pass because our documents should have already
  // been inserted by our /lib/startup.js file.
  for ( var i = 0; i < groups.length; i++ ) {
    var groupName = groups[i].name;
    var getGroup  = FoodGroups.findOne({"name": groupName});

    // Verify
    // Here we check that the name of the currently looped group is equal to the
    // name of the document returned by our findOne query. If a group does not
    // exist in the database, this would return an error saying that it cannot
    // ready property 'name' of undefined (you can test this by adding an extra
    // object with name and example properties to the groups array above).
    test.equal( groups[i].name, getGroup.name );
  }
});

Tinytest.add('Can we insert data into the FoodGroups collection on the server?', function( test ) {
  // Setup
  // We need to do two things to "setup" our test. First, we need to create an
  // example object that we can insert into the database. This isn't just any
  // object, but one that directly reflects the structure of data in our live
  // application.
  var testFoodGroup = {
    name: "tester",
    example: "Shrimp"
  };

  // Before we insert our test object, we need to remove any existing copies of
  // it to ensure that we're not getting any false positives or negatives.
  FoodGroups.remove({name: "tester", example: "shrimp"});

  // Execute
  // Next, we need to insert our test object from above. Note that here we're
  // assigning our insert method call to a variable newGroup. Just like in a
  // normal Meteor app, Meteor will return an _id string (we'll make use of
  // this below).
  var newGroup = FoodGroups.insert( testFoodGroup );

  // Verify
  // Now, we need to make sure that our insert worked. Here we perform a query
  // looking for an object that has a name property equal to our object above.
  var testQuery = FoodGroups.findOne( {"name": "tester"}, {fields: {"name": 1} } ),
  // Next, we create an object to pass as the expected result for our test.
  // Quite literally, this is the object we expect our test query to return.
  // Note that here, we make use of our newGroup variable (our new documentId)
  // to dynamically set our expected result. Now when this runs, we can be
  // certain that the object we get out of the database is the one we inserted.
  expectedResult = { "_id": newGroup, "name": "tester" };
  // Here we just run the test, passing our testQuery variable (actual) and our
  // expectedResult variable (expected).
  test.equal( testQuery, expectedResult );

  // Teardown
  // Finally, as a bit of percaution, we make sure to scrub our test object from 
  // our database. Even though we do this above, this ensures that any other
  // database tests don't conflict with our test data.
  FoodGroups.remove( newGroup );
});
