/* See license.txt for terms of usage */

define([
    "firebug/lib/trace",
    "sidepanel/myPanel",
    "sidepanel/mySidePanel",
    "sidepanel/myNetSidePanel",
],
function(FBTrace, MyPanel, MySidePanel, MyNetSidePanel) {

// ********************************************************************************************* //
// The application object

var theApp =
{
    initialize: function()
    {
        Firebug.registerPanel(MyPanel);
        Firebug.registerPanel(MySidePanel);
        Firebug.registerPanel(MyNetSidePanel);
    },

    shutdown: function()
    {
        FBTrace.sysout("sidePanel; shutdown");

        Firebug.unregisterPanel(MyPanel);
        Firebug.unregisterPanel(MySidePanel);
        Firebug.unregisterPanel(MyNetSidePanel);
    }
}

// ********************************************************************************************* //

return theApp;

// ********************************************************************************************* //
});
