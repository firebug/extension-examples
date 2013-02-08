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
    // Toolbar

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

        buttons.push({
            type: "menu",
            label: "toolbar.button.label2",
            tooltiptext: "toolbar.button.tooltip2",
            items: this.getMenuButtonItems()
        });

        return buttons;
    },

    getMenuButtonItems: function()
    {
        var items = [];

        items.push({
            nol10n: true,
            label: "Item 1",
            command: FBL.bindFixed(this.onHello, this)
        });

        items.push({
            nol10n: true,
            label: "Item 2",
            items: this.getSubMenuItems()
        });

        items.push({
            nol10n: true,
            label: "Item 3",
            type: "checkbox",
            checked: true,
        });

        return items;
    },

    getSubMenuItems: function()
    {
        var items = [];

        items.push({
            nol10n: true,
            label: "Item 2-1",
            type: "radio",
        });

        items.push({
            nol10n: true,
            label: "Item 2-2",
            type: "radio",
        });

        items.push({
            nol10n: true,
            label: "Item 2-3",
            type: "radio",
            checked: true,
        });

        return items;
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Options Menu

    getOptionsMenuItems: function()
    {
        return this.getMenuButtonItems();
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Context Menu

    getContextMenuItems: function()
    {
        return this.getMenuButtonItems();
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
