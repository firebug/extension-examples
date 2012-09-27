/* See license.txt for terms of usage */

define([
    "firebug/lib/object",
    "firebug/lib/trace",
],
function(Obj, FBTrace) {

// ********************************************************************************************* //
// Constants

FBTrace = FBTrace.to("DBG_REMOTESELECTOR");

// ********************************************************************************************* //
// Custom Module Implementation

var SelectorModule = Obj.extend(Firebug.Module,
{
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Initialization

    initialize: function(owner)
    {
        Firebug.Module.initialize.apply(this, arguments);

        FBTrace.sysout("remoteSelector; SelectorModule.initialize");

        //Firebug.connection.addListener(this);
    },

    shutdown: function()
    {
        Firebug.Module.shutdown.apply(this, arguments);

        //Firebug.connection.removeListener(this);

        FBTrace.sysout("remoteSelector; SelectorModule.shutdown");
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Connection

    onConnect: function(proxy)
    {
        FBTrace.sysout("remoteSelector; selectorModule.onConnect");

        var self = this;
        proxy.connection.listTabs(function(response)
        {
            var tab = response.tabs[response.selected];
            self.tabActor = tab.actor;

            proxy.connection.attachTab(self.tabActor, function(response)
            {
                self.onTabAttached(proxy.connection);
            });
        });
    },

    onDisconnect: function(proxy)
    {
        FBTrace.sysout("remoteSelector; selectorModule.onDisconnect");

        var self = this;
        proxy.connection.detachTab(function(response)
        {
            FBTrace.sysout("remoteSelector;tab detached");
        });

        this.tabActor = null;
        this.selectorActor = null;
    },

    onTabAttached: function(connection, tabActor)
    {
        FBTrace.sysout("remoteSelector; selectorModule.onTabAttached", arguments);

        var packet = {
            to: this.tabActor,
            type: "SelectorActor"
        }

        var self = this;
        connection.request(packet, function(response)
        {
            FBTrace.sysout("remoteSelector; on selector actor received", response);
            self.selectorActor = response.actor;
        });
    },

    onTabDetached: function(tab)
    {
        // TODO
    },

    onTabNavigated: function(tab)
    {
        // TODO
    },
});

// ********************************************************************************************* //
// Registration

Firebug.registerModule(SelectorModule);

return SelectorModule;

// ********************************************************************************************* //
});
