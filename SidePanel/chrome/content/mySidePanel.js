/* See license.txt for terms of usage */

define([
    "firebug/lib/lib",
    "firebug/lib/trace",
],
function(FBL, FBTrace) {

// ********************************************************************************************* //
// Panel Implementation

var MySidePanel = function MySidePanel() {};
MySidePanel.prototype = FBL.extend(Firebug.Panel,
{
    name: "mySidePanel",
    title: "My Side Panel",

    /**
     * This panel is automatically used as a side-panel when parent panel is set.
     */
    parentPanel: "myPanel",

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

return MySidePanel;

// ********************************************************************************************* //
});
