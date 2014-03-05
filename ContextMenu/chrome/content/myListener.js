/* See license.txt for terms of usage */

define([
    "firebug/firebug",
    "firebug/lib/trace",
],
function(Firebug, FBTrace) {

// ********************************************************************************************* //
// Implementation

/**
 * This object represents Firebug UI listener. It's registered within the main.js 
 * module using Firebug.registerUIListener() method.
 */
var MyListener =
/** @lends MyListener **/
{
    /**
     * Extends HTML Panel context menu. In order to see the menu items in action
     * right click at a node in the HTML panel and pick any of the "My Menu Item *"
     * from the context menu.
     */
    onContextMenu: function(items, object, target, context, panel, popup)
    {
        if (object == null || object == undefined || panel.name != "html")
            return;

        items.push("-");

        // Simple menu item
        var item1 = {
            id: "myId1",
            label : "My Menu Item 1",
            command: this.onHello.bind(this, object)
        };

        // Menu item with a check mark (an option). Changing an option
        // menu item doesn't close the menu by default, which allows to
        // change several options at once without reopening the menu again
        // and again. If you want to close it set 'closemenu' property
        // to true.
        var item2 = {
            id: "myId2",
            label : "My Menu Item 2",
            type: "checkbox",
            checked: true,
            // closemenu: true,
            command: this.onHello.bind(this, object)
        };

        // Radio menu item.
        var item3 = {
            id: "myId3",
            label : "My Menu Item 3",
            type: "radio",
            checked: true,
            command: this.onHello.bind(this, object)
        };

        items.push(item1, item2, item3);
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Commands

    onHello: function(object)
    {
        // Log into Firebug's Console panel
        Firebug.Console.log("Hello! " + object);

        // Log into the (debugging) tracing console.
        FBTrace.sysout("myListener.onHello;", object);
    }
};

// ********************************************************************************************* //

return MyListener;

// ********************************************************************************************* //
});
