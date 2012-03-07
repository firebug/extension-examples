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
    name: "myToolbar",
    title: "Custom Toolbar",

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

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //

    /**
     * Extends toolbar for this panel.
     */
    getPanelToolbarButtons: function()
    {
        var buttons = [];

        buttons.push({
            label: "toolbar.button.label",
            tooltiptext: "toolbar.button.tooltip",
            command: FBL.bindFixed(this.onHello, this)
        });

        return buttons;
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Commands

    onHello: function()
    {
        alert(FBL.$STR("toolbar.msg.hello2"));
    }
});

// ********************************************************************************************* //

return MyPanel;

// ********************************************************************************************* //
});
