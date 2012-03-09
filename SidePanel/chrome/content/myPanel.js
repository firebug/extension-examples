/* See license.txt for terms of usage */

define([
    "firebug/lib/lib",
    "firebug/lib/trace",
    "sidepanel/mySidePanel",
],
function(FBL, FBTrace, MySidePanel) {

// ********************************************************************************************* //
// Panel Implementation

/**
 * This object represents a main Firebug panel. There are also toolbar buttons that allows
 * to dynamically append and remove a side panel.
 */
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

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //

    /**
     * Extends toolbar for this panel.
     */
    getPanelToolbarButtons: function()
    {
        var buttons = [];

        // Check whether our side panel is registered.
        var registered = Firebug.getPanelType("mySidePanel");

        buttons.push({
            id: "myRemoveSidePanelButton",
            label: "Remove Side Panel",
            disabled: !registered,
            command: FBL.bindFixed(this.onRemoveSidePanel, this)
        });

        buttons.push({
            id: "myAppendSidePanelButton",
            label: "Append Side Panel",
            disabled: registered,
            command: FBL.bindFixed(this.onAppendSidePanel, this)
        });

        return buttons;
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //

    updateToolbar: function()
    {
        var removeBtn = Firebug.chrome.$("myRemoveSidePanelButton");
        var appendBtn = Firebug.chrome.$("myAppendSidePanelButton");

        var registered = Firebug.getPanelType("mySidePanel");
        removeBtn.setAttribute("disabled", registered ? "false" : "true");
        appendBtn.setAttribute("disabled", registered ? "true" : "false");
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Commands

    onRemoveSidePanel: function()
    {
        Firebug.unregisterPanel(MySidePanel);
        this.updateToolbar();
    },

    onAppendSidePanel: function()
    {
        Firebug.registerPanel(MySidePanel);
        this.updateToolbar();
    }
});

// ********************************************************************************************* //

return MyPanel;

// ********************************************************************************************* //
});
