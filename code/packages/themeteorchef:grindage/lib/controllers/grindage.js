Controller('grindage', {
  events: {
    'submit form': function( e, t ) {
      e.preventDefault();
      var foodGroup  = t.find( "[name='foodGroup']" ).value;
      var checkGroup = Grindage( foodGroup );
      
      if ( checkGroup ) {
        alert( "Group exists, budddy!" );
      } else {
        alert( "Bummer, bro. That group doesn't exist." );
      }
    }
  }
});
