/* See license.txt for terms of usage */

define([
    "firebug/lib/lib",
    "firebug/lib/trace",
],
function(FBL, FBTrace) {

// ********************************************************************************************* //
// Implementation

var MyListener =
{
    /**
     * Extends Net panel toolbar.
     */
    onGetPanelToolbarButtons: function(panel, buttons)
    {
        if (panel.name != "net")
            return;

        // Append a new button into Net panel's toolbar.
        buttons.push("-");
        buttons.push({
            label: "toolbar.button.label",
            tooltiptext: "toolbar.button.tooltip",
            command: FBL.bindFixed(this.onHello, this)
        });
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Commands

    onHello: function()
    {
        alert(FBL.$STR("toolbar.msg.hello1"));
    }
};

// ********************************************************************************************* //

return MyListener;

// ********************************************************************************************* //
});
