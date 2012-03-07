/* See license.txt for terms of usage */

define([
    "firebug/lib/trace",
    "toolbar/myModule",
    "toolbar/myListener",
    "toolbar/myPanel",
],
function(FBTrace, MyModule, MyListener, MyPanel) {

// ********************************************************************************************* //
// The application object

var theApp =
{
    initialize: function()
    {
        Firebug.registerStringBundle("chrome://toolbar/locale/toolbar.properties");
        Firebug.registerModule(MyModule);
        Firebug.registerUIListener(MyListener);
        Firebug.registerPanel(MyPanel);
    },

    shutdown: function()
    {
        Firebug.unregisterStringBundle("chrome://toolbar/locale/toolbar.properties");
        Firebug.unregisterModule(MyModule);
        Firebug.unregisterUIListener(MyListener);
        Firebug.unregisterPanel(MyPanel);
    }
}

// ********************************************************************************************* //

return theApp;

// ********************************************************************************************* //
});
