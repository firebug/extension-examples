/* See license.txt for terms of usage */

define([
    "firebug/lib/object",
    "firebug/lib/trace",
],
function(Obj, FBTrace) {

"use strict";

// ********************************************************************************************* //
// MyModule Implementation

var MyModule = Obj.extend(Firebug.Module,
{
    dispatchName: "myModule",

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Initialization

    initialize: function()
    {
        Firebug.Module.initialize.apply(this, arguments);

        Firebug.registerUIListener(this);
    },

    shutdown: function()
    {
        Firebug.Module.shutdown.apply(this, arguments);

        Firebug.unregisterUIListener(this);
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // UI Listener

    /**
     * Executed by the framework when specific tab should be updated.
     */
    onUpdateTab: function(context, tab, panelType)
    {
        if (panelType.name == "MyPanel" || panelType.name == "MySidePanel")
            this.updateTabs(context);
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Module Events

    /**
     * Executed by the framework when context changes and some tabs might be updated.
     */
    showContext: function(browser, context)
    {
        this.updateTabs(context);
    },

    updateTabs: function(context)
    {
        if (!context)
            return;

        var title = context.getTitle();

        var myPanelTab = Firebug.getPanelTab("myPanel");
        var mySidePanelTab = Firebug.getPanelTab("mySidePanel");

        // This code doesn't have to be necessarily in the panel object since the panel
        // doesn't have to be instantiated at this moment. Panel object is usually
        // created when the user selects it for the first time.
        if (myPanelTab)
            myPanelTab.setAttribute("label", "My Panel " + title);

        if (mySidePanelTab)
            mySidePanelTab.setAttribute("label", "My Side Panel " + title);
    }
});

// ********************************************************************************************* //
// Registration

Firebug.registerModule(MyModule);

return MyModule;

// ********************************************************************************************* //
});
