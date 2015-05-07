## Grindage
A package for checking whether what you're eating is part of [the four basic food groups](https://www.youtube.com/watch?v=h1hEKqZz-OY).

**Note**: this package is a total joke and only exists as a demonstration of writing a Meteor package. It was made as a part of [Recipe #7: Writing a Package on The Meteor Chef](http://themeteorchef.com/recipes/writing-a-package).

#### Features
- A custom route in your app for running checks at `/grindage`.
- A form for quickly testing food groups.
- An all-purpose function `Grindage()` for testing food groups.

#### Contents

1. Basic Usage
2. API
3. Tests
4. License

#### Basic Usage
Grindage is designed so that you don't have to do any hard thinking, buddy. It sets up a route, template, and all the good stuff in your app at `http://localhost:3000/grindage`. All you have to do is type in a food group to see if what you're eating is legit.

![Grindage Screenshot](https://s3.amazonaws.com/f.cl.ly/items/3R0J0r3R472w3V2B3u0G/Image%202015-05-07%20at%2011.10.06%20AM.png)

#### API
Grindage relies on a single function to test food groups, `Grindage( "<food-group>" )`. This function is accessible anywhere on the client.

Example API usage:

```
Template.exampleTemplate.events({
  'click .check-group': function() {
    var getGroup   = prompt('What food group are you munching on, budddy?');
    var checkGroup = Grindage( getGroup );

    if ( checkGroup ) {
      alert("Cool, budddy! Keep on cruisin'.");
    } else {
      alert("No, buddy. That's not right. Pack your cheeks with something else, bro.");
    }
  }
});
```

#### Tests
Grindage comes with a set of client and server side tests to make sure our code is cruisin'. Here's how to get it working, budddy:

1. Install the TinyTest package `meteor add tinytest` in your app.
2. Run Meteor with tests `meteor test-packages`.
3. Pop open your browser `http://localhost:3000`.
4. Verify tests are passing.

![Tests Screenshot](http://cl.ly/atZz/Image%202015-05-07%20at%2011.22.20%20AM.png)

**Note:** if your app is already running on `http://localhost:3000`, you can run tests separately by running `meteor --port 3001 test-packages`.

#### License
The code for this package is licensed under the [MIT License](http://opensource.org/licenses/MIT).
