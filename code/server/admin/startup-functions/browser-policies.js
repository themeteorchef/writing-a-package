/*
* Browser Policies
* Browser policy customizations.
* Documentation: https://atmospherejs.com/meteor/browser-policy
*/

customBrowserPolicies = function(){
  BrowserPolicy.content.allowOriginForAll('https://www.youtube.com');
  BrowserPolicy.content.allowOriginForAll('https://youtube.com');
}
