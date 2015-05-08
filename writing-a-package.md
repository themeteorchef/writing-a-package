# Getting Started
Because the focus of this recipe is on writing a package, we won't be adding too many packages to our actual application. To get started, we just need one: Tinytest.

<p class="block-header">Terminal</p>
```.lang-bash
  meteor add tinytest
```

Tinytest is a testing framework written by the Meteor Development Group. It's a minimalist solution to testing that makes it easy to test our packages. It's easy to pick up, so it's a great way to dip your toes into the testing pool.

## Local Packages
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

## Responsible Package Development
Before we dive in to writing our package for this recipe, it's important to give a hat tip to the notion of responsible package development. Because literally _anyone_ can create a package for Meteor, it's incredibly easy to pollute the package directory with duplicate packages.

Namely, this mostly applies to creating packages that are simple wrappers around existing libraries (e.g. that totally rad jQuery animation plugin you love). The best of rule of thumb is: search first. If your wrapping existing code, make sure somebody hasn't already done so (and is actively maintaing it).

[Dan Dascalescu](https://twitter.com/dandv) gave [a lightning talk](https://www.youtube.com/watch?v=g-idz8UPtDM) at the December 2014 Devshop meetup about this that's worth its 6 minute runtime:

<iframe width="560" height="315" src="https://www.youtube.com/embed/g-idz8UPtDM" frameborder="0" allowfullscreen></iframe>


## Grindage
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

# Package.js
- Package.describe
- Package.onUse
  - api.use
  - api.imply
  - api.addFiles
  - api.export
- Package.onTest
- Advanced Package APIs

# Writing Package Code
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
