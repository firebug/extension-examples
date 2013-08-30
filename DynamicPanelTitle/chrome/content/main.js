/* See license.txt for terms of usage */

define([
    "firebug/lib/trace",
    "dynamicpaneltitle/myPanel",
    "dynamicpaneltitle/mySidePanel",
    "dynamicpaneltitle/myModule",
],
function(FBTrace, MyPanel, MySidePanel, MyModule) {

// ********************************************************************************************* //
// The Application Object

var theApp =
{
    initialize: function()
    {
        // TODO: Extension initialization
    },

    shutdown: function()
    {
        // Unregister all registered components
        Firebug.unregisterPanel(MyPanel);
        Firebug.unregisterPanel(MySidePanel);
        Firebug.unregisterModule(MyModule);

        // TODO: Extension shutdown
    }
}

// ********************************************************************************************* //

return theApp;

// ********************************************************************************************* //
});
