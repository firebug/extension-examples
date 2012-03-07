/* See license.txt for terms of usage */

define([
    "firebug/lib/lib",
    "firebug/lib/trace",
],
function(FBL, FBTrace) {

// ********************************************************************************************* //
// Custom Module Implementation

Firebug.MyModule = FBL.extend(Firebug.Module,
{
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Initialization

    initialize: function(owner)
    {
        Firebug.Module.initialize.apply(this, arguments);

        // The main Firebug toolbar can't be extended from a panel object since it's
        // crated as soon as the panel is actualy selected by the use (which doesn't
        // have to even happen). That's why we are creating the button here, in a module.
        this.buttons = [];
        this.buttons.push("-");
        this.buttons.push({
            tooltiptext: "toolbar.button.tooltip",
            image: "chrome://toolbar/skin/button.png",
            command: FBL.bindFixed(this.onHello, this)
        });

        for (var i=0; i<this.buttons.length; i++)
            Firebug.chrome.appendToolbarButton(this.buttons[i]);
    },

    shutdown: function()
    {
        Firebug.Module.shutdown.apply(this, arguments);

        for (var i=0; i<this.buttons.length; i++)
            Firebug.chrome.removeToolbarButton(this.buttons[i]);
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Commands

    onHello: function()
    {
        alert(FBL.$STR("toolbar.msg.hello3"));
    }
});

// ********************************************************************************************* //

return Firebug.MyModule;

// ********************************************************************************************* //
});
