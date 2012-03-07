/* See license.txt for terms of usage */

define([
    "firebug/lib/trace",
    "tabularui/tabularDataPanel",
],
function(FBTrace, TabularDataPanel) {

// ********************************************************************************************* //
// The application object

var theApp =
{
    initialize: function()
    {
        Firebug.registerPanel(TabularDataPanel);

        FBTrace.sysout("tabularui; initialize");
    },

    shutdown: function()
    {
        Firebug.unregisterPanel(TabularDataPanel);

        FBTrace.sysout("tabularui; shutdown");
    }
}

// ********************************************************************************************* //

return theApp;

// ********************************************************************************************* //
});
