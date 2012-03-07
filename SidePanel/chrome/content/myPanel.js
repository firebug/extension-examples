/* See license.txt for terms of usage */

define([
    "firebug/lib/lib",
    "firebug/lib/trace",
],
function(FBL, FBTrace) {

// ********************************************************************************************* //
// Panel Implementation

var MyPanel = function MyPanel() {};
MyPanel.prototype = FBL.extend(Firebug.Panel,
{
    name: "myPanel",
    title: "My Panel",

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

return MyPanel;

// ********************************************************************************************* //
});
