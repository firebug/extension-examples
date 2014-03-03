/* See license.txt for terms of usage */

define([
    "firebug/lib/trace",
    "contextmenu/myListener",
],
function(FBTrace, MyListener) {

// ********************************************************************************************* //
// The application object

var theApp =
{
    initialize: function()
    {
        Firebug.registerUIListener(MyListener);
    },

    shutdown: function()
    {
        Firebug.unregisterUIListener(MyListener);
    }
}

// ********************************************************************************************* //

return theApp;

// ********************************************************************************************* //
});
