Controller('grindage', {
  events: {
    'submit form': function( e, t ) {
      e.preventDefault();
      var foodGroup = t.find("[name='foodGroup']").value;
      return Grindage( foodGroup );
    }
  }
});
