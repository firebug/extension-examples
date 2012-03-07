/* See license.txt for terms of usage */

define([
    "firebug/lib/lib",
    "firebug/lib/trace",
],
function(FBL, FBTrace) {

// ********************************************************************************************* //
// Panel Implementation

var MyNetSidePanel = function MyNetSidePanel() {};
MyNetSidePanel.prototype = FBL.extend(Firebug.Panel,
{
    name: "myNetSidePanel",
    title: "My Net Side Panel",

    /**
     * This panel is automatically used as a side-panel when parent panel is set.
     * In this case we are injecting a side panel into an existing panel.
     */
    parentPanel: "net",

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Initialization

    initialize: function()
    {
        Firebug.Panel.initialize.apply(this, arguments);
    },

    destroy: function(state)
    {
        Firebug.Panel.destroy.apply(this, arguments);
    },
});

// ********************************************************************************************* //

return MyNetSidePanel;

// ********************************************************************************************* //
});
