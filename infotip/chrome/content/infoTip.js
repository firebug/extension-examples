/* See license.txt for terms of usage */

FBL.ns(function() { with (FBL) { 

// ********************************************************************************************* //
// Constants

const Cc = Components.classes;
const Ci = Components.interfaces;

// ********************************************************************************************* //
// Model Implementation

Firebug.InfoTab = extend(Firebug.Module,
{ 
    initialize: function()
    {
        Firebug.NetMonitor.NetInfoBody.addListener(this);
        Firebug.InfoTip.addListener(MyInfoTip);
    },

    shutdown: function()
    {
        Firebug.NetMonitor.NetInfoBody.removeListener(this);
        Firebug.InfoTip.removeListener(MyInfoTip);
    },

    // NetInfoBody listener
    initTabBody: function(infoBox, file)
    {
        Firebug.NetMonitor.NetInfoBody.appendTab(infoBox, "InfoTab", "InfoTab");
    },

    destroyTabBody: function(infoBox, file)
    {
    },

    updateTabBody: function(infoBox, file, context)
    {
        // Get currently selected tab.
        var tab = infoBox.selectedTab;

        // Generate content only for the first time; and only if our tab 
        // has been just activated.
        if (tab.dataPresented || !hasClass(tab, "netInfoInfoTabTab"))
            return;

        // Make sure the content is generated just once.
        tab.dataPresented = true;

        // Get body element associated with the tab.
        var tabBody = getElementByClass(infoBox, "netInfoInfoTabText");
        MyTabContent.tag.replace({}, tabBody);
    },

    showInfoTip: function(infoTip, target, x, y)
    {
    }
}); 

// ********************************************************************************************* //
// InfoTip

var MyTabContent = domplate(Firebug.Rep,
{
    tag:
        SPAN({"class": "helloWorld"},
            "Hello World!"
        ),
});

var MyInfoTip = domplate(Firebug.Rep,
{
    tag:
        DIV("Hello from an info tip!"),

    // InfoTip listener
    showInfoTip: function(infoTip, target, x, y)
    {
        if (!hasClass(target, "helloWorld"))
            return false;

        FBTrace.sysout("showInfoTip", target);

        this.tag.replace({}, infoTip);
        return true;
    }
});

// ********************************************************************************************* //
// Registration

Firebug.registerModule(Firebug.InfoTab);

// ********************************************************************************************* //
}});
