/* See license.txt for terms of usage */

define([
    "firebug/lib/trace",
    "panelsplitter/myPanel",
],
function(FBTrace, MyPanel) {

// ********************************************************************************************* //
// The Application Object

var theApp =
{
    initialize: function()
    {
        if (FBTrace.DBG_PANELSPLITTER)
            FBTrace.sysout("panelSplitter; initialize");

        // TODO: Extension initialization
    },

    shutdown: function()
    {
        if (FBTrace.DBG_PANELSPLITTER)
            FBTrace.sysout("panelSplitter; shutdown");

        // Unregister all registered Firebug components
        Firebug.unregisterPanel(MyPanel);
        Firebug.unregisterStylesheet("chrome://panelsplitter/skin/panelsplitter.css");
        Firebug.unregisterStringBundle("chrome://panelsplitter/locale/panelsplitter.properties");

        // TODO: Extension shutdown
    }
}

// ********************************************************************************************* //

return theApp;

// ********************************************************************************************* //
});
