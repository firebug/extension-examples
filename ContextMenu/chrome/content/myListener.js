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
     * Extends HTML Panel Context Menu. In order to see the menu in action
     * right click at a node in the HTML panel and pick "My Menu Item"
     * from the context menu.
     */
    onContextMenu: function(items, object, target, context, panel, popup)
    {
        if (object == null || object == undefined || panel.name != "html")
            return;

        var item = {
            id: "myId",
            type : "checkbox",
            checked : true,
            label : "My Menu Item",
            command: this.onHello.bind(this, object)
        };

        items.push("-");
        items.push(item);
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Commands

    onHello: function(object)
    {
        alert("Clicked object: " + object);
    }
};

// ********************************************************************************************* //

return MyListener;

// ********************************************************************************************* //
});
