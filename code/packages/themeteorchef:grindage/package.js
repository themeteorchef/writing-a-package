Package.describe({
  name: "themeteorchef:grindage",
  summary: "Learn the four basic food groups, buddddddy.",
  version: "1.0.0",
  git: "https://github.com/themeteorchef/grindage"
});

Package.onUse(function(api) {
  api.versionsFrom("1.0.1");

  // Dependencies
  // Packages that our package is dependent on to work.
  api.use(["templating", "underscore"]);
  api.use(["iron:router@1.0.7"], 'client', {weak: false, unordered: false});
  api.use(["themeteorchef:controller"], 'client');

  // Package Files
  // The actual files that make up our package. Note: unlike a Meteor app,
  // we have to explicity load in each file for our package. This allows us
  // to control load order a little easier.

  // Loading files on both the client and the server.
  api.addFiles([
    "lib/collections/food-groups.js"
  ], ['client', 'server']);

  // Loading files on the server only.
  api.addFiles([
    "lib/publications/food-groups.js",
    "lib/startup.js"
  ], ['server']);

  // Loading files on the client only.
  api.addFiles([
    "lib/modules/grindage.js",
    "lib/stylesheets/grindage.css",
    "lib/templates/grindage.html",
    "lib/controllers/grindage.js",
    "lib/routes/routes.js"
  ], ['client']);

  // Package Variables
  // By default, any global variables contained in our package files are only
  // visible to the package. If we want to make any of those variables public,
  // we need to "export" them so they're visible to the rest of our app
  // and other packages. Note: the variable being exported here, Grindage, is
  // coming from our file added above at /lib/modules/wheez.js.
  api.export("Grindage", 'client');
  api.export("FoodGroups", ['client', 'server']);
});

Package.onTest(function (api) {

  // In order to test our code we need to load in the tinytest package along
  // with our package. Note: we expose both to the client and the server as our
  // package and tests need to run on both.
  api.use([
    "tinytest",
    "themeteorchef:grindage"
  ], ['client', 'server']);

  // Load in each of our test files. Here, we have two files: one for client and
  // one for server. Note that in order to tell tinytest where the tests should
  // run, we pass either a "client" or "server" string after the file. You are
  // not required to put your tests in a /client or /server directory. They can
  // live in the /tests directory just fine. The only thing that matters is
  // passing the "client" or "server" string.
  api.addFiles("tests/client/client-tests.js", "client");
  api.addFiles("tests/server/server-tests.js", "server");
});
