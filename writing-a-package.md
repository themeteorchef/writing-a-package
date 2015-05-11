### Getting Started
Because the focus of this recipe is on writing a package, we won't be adding too many packages to our actual application. To get started, we just need one: Tinytest.

<p class="block-header">Terminal</p>
```.lang-bash
  meteor add tinytest
```

Tinytest is a testing framework written by the Meteor Development Group. It's a minimalist solution to testing that makes it easy to test our packages. It's easy to pick up, so it's a great way to dip your toes into the testing pool.

### Local Packages
In order to develop packages locally, we need to do a little bit of configuration on our machine. By default, when we use the `meteor add <package-name>` command, Meteor just jumps up to the package server at `packages.meteor.com` and searches for your package.

In order to work with our local package code, we need to override this by setting a global environment variable called `PACKAGE_DIRS` in our shell:

> Global variables or environment variables are available in all shells.

- [Bash Guide for Beginners](http://tldp.org/LDP/Bash-Beginners-Guide/html/sect_03_02.html)

Just like it sounds, `PACKAGE_DIRS` is meant to point to a directory containing all of your local packages. This means that in terms of organization, it's best to have one directory on your computer _just for your Meteor packages_. Note: this doesn't mean packages you install from third-party authors, but rather, packages that you write and release yourself.

In order to set `PACKAGE_DIRS`, you need to export it to your shell. Let's look at two ways to do this (one is using the more common Bash shell environment, and the other using Zsh, a popular alternative to Bash).

For Bash, add the following to the end of your `~/.bash_profile`:

<p class="block-header">~/.bash_profile</p>
```.lang-bash
  # Define PACKAGE_DIRS for Local Meteor Packages
  export PACKAGE_DIRS="$HOME/path/to/packages"
```

Here, `/path/to/packages` is quite literally the folder path to where you keep your packages. A good example of this could be `/projects/meteor/packages`. The `$HOME` prefix here simply points the start of the path to your home directory, or, `~`.

<p class="block-header">~/.zprofile</p>
```.lang-bash
  # Define PACKAGE_DIRS for Local Meteor Packages
  export PACKAGE_DIRS="$HOME/path/to/packages"
```

Same thing for Zsh, but note that the profile is located in `~/.zprofile` instead of `~/.bash_profile`.

<div class="note">
  <h3>A quick note</h3>
  <p>An alternative to setting the PACKAGE_DIRS variable is to use symlinks. This would mean running `ln -s /path/to/author:package-name packages/author:package-name` from the root of your Meteor project.</p>
</div>

Lastly, we need to tell our Meteor app about our package. In order to do this, from our Meteor project's root in the Terminal:

<p class="block-header">Terminal</p>
```.lang-bash
  meteor add author:package-name
```

If we've done everything correctly, we should see the package install and upon running `meteor list`, see our package listed, with a `+` symbol after it's version (as a note at the bottom of the list will explain, this denotes packages that are built locally from source).

![Example package list with local packages](http://cl.ly/auWn/Image%202015-05-08%20at%2011.04.51%20AM.png)

In order to build the package for this recipe, we'll be doing something a little different than this, but this is all good to know and configure up front before you become _Packagetron 5000: Master of Packages_.

### Responsible Package Development
Before we dive in to writing our package for this recipe, it's important to give a hat tip to the notion of responsible package development. Because literally _anyone_ can create a package for Meteor, it's incredibly easy to pollute the package directory with duplicate packages.

Namely, this mostly applies to creating packages that are simple wrappers around existing libraries (e.g. that totally rad jQuery animation plugin you love). The best of rule of thumb is: search first. If your wrapping existing code, make sure somebody hasn't already done so (and is actively maintaing it).

[Dan Dascalescu](https://twitter.com/dandv) gave [a lightning talk](https://www.youtube.com/watch?v=g-idz8UPtDM) at the December 2014 Devshop meetup about this that's worth its 6 minute runtime:

<iframe width="560" height="315" src="https://www.youtube.com/embed/g-idz8UPtDM" frameborder="0" allowfullscreen></iframe>


### Grindage
If you were a child of the 90's like myself, it's likely that you found yourself giggling at a [Pauly Shore](http://en.wikipedia.org/wiki/Pauly_Shore) movie or two growing up. Before we dig in, let us bow our heads in awe of how a character like Pauly Shore could only have existed in the 90s and _no other time_. Ohm.

Okay! Grindage. What the hell is that? Let's pause for a second to review:

<iframe width="420" height="315" src="https://www.youtube.com/embed/h1hEKqZz-OY" frameborder="0" allowfullscreen></iframe>

Got it? Great. So we have four basic food groups. In order to ensure that our nutrition (and our fellow Meteor developers) is up to snuff, we're going to write a package that tests whether or not a given food group is legit. To get started, make sure you've setup a fresh Meteor project and have added a `/packages` directory to the root.

<div class="note">
  <h3>A quick note</h3>
  <p>You can tackle this recipe by writing everything from scratch, or, if you just want to follow along, you can <a href="https://github.com/themeteorchef/writing-a-package">clone the source on GitHub</a>. Both are valid options!</p>
</div>

Next, we need to create our package. We can do this manually, or, we can be smart and use a handy little command built into Meteor (make sure to `cd` into the `packages` directory of your project before doing this):

<p class="block-header">Terminal</p>
```.lang-bash
  meteor create --package author:package-name
```

**Note**: you will want to replace `author` and `package-name` above with your own details. For this recipe, you can do something like `<your-meteor-username>:grindage`, or `personflerson:grindage`. In the [recipe source](https://github.com/themeteorchef/writing-a-package) we've already set this up as `themeteorchef:grindage`.

Cool! This should have added a new directory to your `/packages` directory called `grindage`. This will also populate the directory with some boilerplate to help us get our package setup a little quicker. Neat!

<div class="note">
  <h3>A quick note</h3>
  <p>In order to guide you in the package writing process, I'd recommend check out a little tool by my buddy Dean Radcliffe (<a href="http://twitter.com/chicagogrooves">@chicagogrooves</a>) called <a href="http://package-kitchen.meteor.com">Package Kitchen</a>. It's super handy for spinning up new packages. Check it out!</p>
</div>

But wait, what's up with the colon convention in the demo?

Prior to Meteor v1.1.0, Meteor used to create packages using the colon syntax to match how it references packages on the package server. As v1.1.0 introduced Windows support, they had to drop the colon syntax when creating folders as Windows machines don't support it. Bonk. Keep in mind: you still add packages using the colon syntax in your terminal like `meteor add author:package`.

Okay, budddy. Onward!

### Package.js

Alright, so we've got our package template setup. Before we dive into actually writing the code for our package, we're going to walk through the various APIs that Meteor gives us access to for _writing_ our package. This part is a bit winded, so feel free to skip around to the relevant parts or jump down to the meaty stuff.

The first thing we want to do is open up our `package.js` file inside of our freshly minted directory. First up, let's talk about the `Package.describe` block and how it works.

#### Package.describe
The describe block in your `package.js` file does exactly what it says: describes your package. More specifically, this is the information that Meteor uses to register the package with the Meteor package system. It contains the name of the package, a summary of what the package does, a version number, and a GitHub repository link.

<p class="block-header">/packages/grindage/package.js</p>
```.lang-javascript
Package.describe({
  name: "<author>:grindage",
  summary: "Learn the four basic food groups, buddddddy.",
  version: "1.0.0",
  git: "https://github.com/<author>/grindage"
});
```

Pretty self-explanatory. A few things to point out, though.

##### Name
Notice that the name field here is the _full name_ of the package as a user would add it in their terminal. In this example, we've replaced the author name with `<author>` but ultimately this would look something like `themeteorchef:grindage`. Setting this field is optional as Meteor automatically pulls the name based on the directory. This can be a bit confusing, though, so it's good practice to set it anyways.

##### Summary
For the summary, the name of the game is: keep it short. This should be one sentence (two if you _must_) that says what the package does. Another example of this could be "Adds support for the Bootstrap CSS framework." Short and simple. Keep in mind, you'll have an opportunity to elaborate on your package and how it works when we discuss writing a README.md later on.

##### Version
Versioning your package is essential, as it's how Meteor knows to share new releases of your package with users. We'll discuss versioning your package in detail later, but it's important to know that whenever you make a change to your package, you will need to change this number before you publish the release.

##### Git
Lastly, we have a git field. This is simply meant as a way to link a repository to a package. This _does not_ sync your package code with GitHub. It's just a link. This field is entirely optional and usually reserved for public packages. A good rule of thumb: if it's an open source, public package, make sure it has a GitHub repo. If it's closed source and just for you (or your team), add a repo at your discretion.

Making sure these fields exist in your `Package.describe` block is helpful to other developers looking at your code. Even if they're not 100% required, if your goal is to share with others, make sure they're filled out properly.

#### Package.onUse
The next—and most important—block of our `package.js` file is the Package.onUse section. This section is where we define the dependencies, files, and exports for our package. Without this, our package won't work. Let's take a peak at each of the methods we'll use inside of this block and how they work.

<div class="note">
  <h3>A quick note</h3>
  <p>We'll be referencing files that are a part of the themeteorchef:grindage package this recipe is based on moving forward. If something sounds funky, make sure to <a href="https://github.com/themeteorchef/writing-a-package/tree/master/code/packages/themeteorchef:grindage">check the repository</a> as what you need is likely there.</p>
</div>

The first thing to point out is that within our block, Meteor passes an `api` argument that we can use. The `api` variable contains all of the methods that we'll need to define dependencies, files, and exports for our package.

##### api.versionsFrom
<p class="block-header">/path/to/file</p>
```.lang-javascript
Package.onUse(function(api) {
  api.versionsFrom("1.0.1");
  [...]
});
```

At the very top of our `Package.onUse` block is a one-liner `api.versionsFrom()`. This method is responsible for taking a string that denotes the version of the Meteor core packages you want to use. From the docs:

> Use versions of core packages from a release. Unless provided, all packages will default to the versions released along with meteorRelease. This will save you from having to figure out the exact versions of the core packages you want to use.
>
> — [Meteor Documentation](http://docs.meteor.com/#/full/pack_versions)

Note: this doesn't automatically include the core packages as dependencies, but rather, acts as a quick reference for those packages to check if and when they're added.

##### api.use
Next up is the `.use()` method which is responsible for defining external package dependencies for our own package. You can have as many `api.use()` calls as you want. `.use()` calls can be defined to load a single file, or, an array of files. An `api.use()` call can accept a few arguments `api.use(<package(s)>, <architecture>, <options>)`:

- `package(s)`: either a single string or array of strings of packages that should be depended on. The array convention can be used to group together package dependencies that will be loaded using the same architecture and/or options.
- `architecture`: where in the application the package and its exports should be made available. This can be set to `client`, `server`, `web.browser`, or `web.cordova`.
- `options`: An object containing two settings (explained below), `weak` and unordered.

Let's take a look at our Grindage package to see a few different versions of using `api.use()`.

<p class="block-header">/path/to/file</p>
```.lang-javascript
Package.onUse(function(api) {
  [...]

  api.use(["templating", "underscore"]);
  api.use(["iron:router@1.0.7"], 'client', {weak: false, unordered: false});
  api.use(["themeteorchef:controller"], 'client');

  [...]
});
```

Here, we've broken up our `.use()` calls into three separate blocks. Let's step through each one.

##### Core dependencies
The first block `api.use(["templating", "underscore"]);` is us loading in _core_ dependencies. These are the packages that ship with Meteor. Placing this block here is by no means required, but a nice starting layer to help you separate Meteor packages vs. third-party/user packages.

Essentially, when you're writing a package for Meteor you should assume that you're working with a blank sheet. This means that if your package needs to use templates, you will have to tell Meteor that the package needs access to the `templating` package from core. The same applies to _any_ external package code, core or otherwise. Okay...how do I know which core packages to load in?

This is kind of tricky. Your first question might be "what _are_ the core packages?" To which I'd laugh and say, "pull up a chair and let's browse GitHub." At the moment, the best resource for knowing what the core packages are is to browse the [Meteor GitHub repository](https://github.com/meteor/meteor/tree/devel/packages). Here, you'll find the entire list of packages baked into core. Where this gets a little difficult is deducting _which_ packages are required for _which_ functionality. This, admittedly, require some tinkering. Some stuff is obvious. We use templates in our package so we need the `templating` package. The same with `underscore`.

The name of the game for now is to get comfortable browsing the source of the core packages. What's interesting about this is that some core packages, like `templating`, have their _own_ dependencies. Which means in some cases, you only need to load one package as it will automatically pull in the others for you. A bit of wisdom if you're just getting started: don't let this process frustrate you. It _is_ a bit tedious at first, but you pick it up pretty quickly. It can even be fun picking apart each of the core package to learn how they work and what they depend on under the hood. Don't give up! Just pop open the [packages directory](https://github.com/meteor/meteor/tree/devel/packages) and when in doubt read the `package.js` file for the packages that sound like what you need.

##### External dependency w/ version and options
This one tripped me up. One of the things to keep in mind when working with Meteor packages is that when specifying a dependency, Meteor will always attempt to add the latest version of that package to your app. One of our dependencies, Iron Router, has a funky version history.

In order to get it working, notice that we have to "pin" it to a specific version `"iron:router@1.0.7"`. This tells Meteor that we want to load this package as a dependency _at this specific version_. Without it, Meteor's version solver will attempt to load what it thinks is the latest version (in the case of Iron Router, ADD THE VERSION HERE).'

**Note: this does not apply to all packages.** Only in cases where the version history has been fudged will you need to do this. Generally speaking, packages where this is an issue have documented in their README file. If you run into a snag where a package isn't working after being set as a dependency: start there.

Lastly, you'll notice a few other things being passed to the `api.use()` call. Here, we're also passing where we want the dependency to be loaded `client` and an object with some parameters: `weak` and `unordered`. What are these?

The `weak` setting takes a boolean value that tells Meteor whether or not the package _must_ be included in the app. This is sort of confusing. From the docs:

> Establish a weak dependency on a package. If package A has a weak dependency on package B, it means that including A in an app does not force B to be included too — but, if B is included or by another package, then B will load before A.

Essentially, if this is set to `true`, Meteor will not bother including the package. Off-hand, this seems to be useful when you know that the package you're adding will be available for certain in the host application. Because we're writing a package for the public where this is an uncertain, we set it to `false` to ensure Iron Router is included if it's not already present.

Lastly, we have a field called `unordered`, also set to `false`. This value simply tells Meteor whether it's okay to load the dependency _after_ your package code. In the case of Grindage this is _not_ okay, so we set it to false.

By default, both `weak` and `unordered` are set to false, so you _do not_ need to pass this object like we have here. Only if one (or both) of these parameters will be set to `true` do you need to pass it.  

##### External dependencies by location
We technically covered this in the previous example, but it's worth pointing out on its own. Here, we're passing a single string to tell Meteor where this dependency should be loaded. In the case of Grindage, we only need it on the client. However, we can just as easily switch this to be `'server'`, or, pass both `client` and `server` as an array like `api.use(['themeteorchef:controller'], ['client', 'server'])`.

#### api.imply
So, `api.use()` lets us load dependencies for our own package, but Meteor also gives us another method `api.imply()`. What does this do? This method is responsible for making the code (specifically, the exported symbols/variables) from packages we depend on accessible to our host app. For example, say that our package depends on a package called `themeteorchef:tacos`. That packages, `tacos`, exports a symbol `EatTacos` that we need to make use of within our package. Ideally, though, we also want the user who installs our package to have access to the `EatTacos` symbol. Using `api.imply()`, we can do this.

<div class="note">
  <h3>A quick note</h3>
  <p>We haven't used api.imply() in the Grindage package, but it's good to know that it exists and how it works.</p>
</div>

#### api.addFiles
The big show! `api.addFiles()` does exactly what you think: adds the files for your package. More specifically, this adds the code _you've written_ for your package to the package. This is important. Unlike a normal Meteor app, if you don't add files using the `.addFiles()` method, they might as well not exist. The reason Meteor does this like this is that it allows us to specify a _load order_. So, if one file has a function that a later file needs, we can load that one _first_ to make sure it's ready before the other one. Simple! Let's look at Grindage to see how we're doing this:

<p class="block-header">/path/to/file</p>
```.lang-javascript
Package.onUse(function(api) {
  [...]

  api.addFiles([
    "lib/collections/food-groups.js"
  ], ['client', 'server']);

  api.addFiles([
    "lib/publications/food-groups.js",
    "lib/startup.js"
  ], ['server']);

  api.addFiles([
    "lib/modules/grindage.js",
    "lib/stylesheets/grindage.css",
    "lib/templates/grindage.html",
    "lib/controllers/grindage.js",
    "lib/routes/routes.js"
  ], ['client']);

  [...]
});
```

Woah smokies! That's a lot of stuff. Actually, it's not that bad. Here, just like with our `api.use()` method we can have as many `addFiles` blocks as we want. In contrast to our `.use()` example, though, here we're doing this on purpose. Each of the three blocks above is grouped together based on _which architecture they'll use_. Remember: the architecture is _where_ in the app the files should be loaded. Here, we run the gamut: `client`, `server`, and `client` _and_ `server`.

Just like with `.use()` we can pass a single string for both the file and the architecture, or, we can pass arrays. Here we're using array syntax for both files and architecture (even where we have just one of each) for the sake of similarity. This _is not_ required for single files/architectures.

Hopefully what we're loading is pretty clear, but let's talk through it. The first block is defining a collection for us on both the client and the server called `FoodGroups`. Here, we'll store some default food groups for our "checker" tool. Next, we setup a publication for our `FoodGroups` collection along with a startup script, both on the server.

The startup script is responsible for automatically inserting our default food groups if they don't already exist in the collection. Pay attention, we're making sure that our collection is available _before_ we attempt to insert data into it.

The last block is responsible for loading our core package code. Here, we load in the module that contains our `Grindage()` function for actually _checking_ food groups, along with some CSS, HTML, and template logic for a helper template we've made (this gives users of our package a little GUI to use the `Grindage()` function). Lastly, we've created a route using Iron Router so that our users can easily access our template at `http://localhost:3000/grindage`. Sweet!

#### api.export
Okay, so we've loaded all of these files...but how do we actually _see_ what they contain? If you're keen, you may have noticed that packages are hyper-explicit in terms of what they make available to the outside world. If you don't say it, it doesn't happen. In light of this, any symbols (another word for variables, specifically, of the global nature) we want to "export" from our package to the host application can be passed to the `api.export()` method.

<p class="block-header">/path/to/file</p>
```.lang-javascript
Package.onUse(function(api) {
  [...]

  api.export("Grindage", 'client');
  api.export("FoodGroups", ['client', 'server']);
});
```

For Grindage, we have two exports. Just like with `.use()` and `addFiles()`, we can pass both strings and arrays for both the variables we want to export and the architecture where they should be visible. The only thing to note, here, is that we're passing the _exact name of the variables_ that we want to export. E.g., in our `lib/modules/grindage.js` file, we have a global variable defined called `Grindage`. The same applies to `FoodGroups`, as it's the variable we've assigned our collection definition to in `/lib/collections/food-groups.js`.

If you ever bump into something not being accessible to another file in your package, it's likely that you forgot to export something. Seriously, I've done this 100 times and it will drive you _nuts_.

Okay! That wraps up the `api.onUse()` block. That was a lot of code. Let's call this a snack break and regroup in about 10-15.

### Package.onTest
Duh, duh, duh! Duh duh duh! Duh duh! Too much drama? Let's be honest: this is one of the scariest parts of working with Meteor right now. Testing. Everybody knows they should be doing it, but it's a bit confusing. Don't worry. Up until recently I've been fairly confused by the whole thing and am still trying to understand the bigger picture. No worries, we'll walk through how to test our package here using Meteor's own Tinytest framework. Deep breaths...

Let's dump out our entire `onTest` block and step through it:

<p class="block-header">/path/to/file</p>
```.lang-javascript
Package.onTest(function (api) {
  api.use([
    "tinytest",
    "themeteorchef:grindage"
  ], ['client', 'server']);

  api.addFiles("tests/client/client-tests.js", "client");
  api.addFiles("tests/server/server-tests.js", "server");
});
```

Pretty simple, right? A few familiar pieces. Just like with our `onUse` block, here, we make use of the `api.use()` and `api.addFiles()` methods. What's going on here? Well, when we go to test our package, Meteor will create an isolated environment of sorts to test our package in. This means that we get a fresh database that's wholly independent from the app our package is installed in and the code runs in isolation. Keep in mind: this is _only_ when we're running our tests. Once we've published our package (we'll cover this in a bit), we should consider our code to be "in the wild" and capable of mass destruction.

In our `api.use()` block, we're calling up two packages: `tinytest`, the testing framework we'll use to actuall define and run our tests, and `themeteorchef:grindage`. Wait...what?! Yep! Here, we can go super-meta and tell our tests to use the package it's testing.

ಠ_ಠ

What this enables us to do is to pull in _all_ of our package code and _all_ of its dependencies in one swoop. This means everything our package needs is made accessible to our testing environment. Nifty, eh? Of course here, we know that our package will be doing work on both the `client` and the `server`, so we make sure to pass both together in array for the architecture field.

Next up, we add two files separately: `client-tests.js` and `server-tests.js`. Fairly self-explanatory, but we need to call attention to the architecture field. In respect to our testing framework, Tinytest, here `client` and `server` are used to denote _where_ the tests need to run.

This means that when Tinytest runs the test, it will take the file with the architecture set to `server` and run the contents of that file (the tests) as _server-side tests_. The same applies to the `client` tests. Here, we've added a bit of syntax in the form of directory and file names to make it a little more clear (not required, but a helpful separation).

Boom! That completes our `package.js` file. It was a lot to cover, but hopefully we now know what we need to know to write our package, test it, and get it out into the real world. Onward!

#### Advanced Package APIs
Wait, wait, wait. We need to discuss advanced package APIs first. There are a few things we haven't covered here that can also be used in your package code.

# Writing Package Code
- File Organization
- Global vs. Local Variables
- Keeping Code Clean
- Documenting APIs with JSDOC

# Writing Tests for Package Code
- What is a test?
- Why do we test?
- How do we test?
  - What is Tinytest?
- What should we test?
- Running tests

# Writing a README
- Defining what the package is for.
- Explaining the API.
- Outlining Tests and Running Tests
- Providing a License

# Versioning Your Package Code
- Using Semvers
- Updating Package.js
- Tagging on GitHub

# Releasing Your Package Code
- Releasing a New Package
- Releasing an Update to an Existing Package

# Maintaining Your Package Code
- Responding to Issues
- Testing Issues
- Updating Code
