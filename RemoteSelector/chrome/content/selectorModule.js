/* See license.txt for terms of usage */

define([
    "firebug/firebug",
    "firebug/lib/object",
    "firebug/lib/trace",
    "firebug/remoting/debuggerClientModule",
    "remoteselector/selectorClient",
],
function(Firebug, Obj, FBTrace, DebuggerClientModule, SelectorClient) {

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

        DebuggerClientModule.addListener(this);
    },

    shutdown: function()
    {
        Firebug.Module.shutdown.apply(this, arguments);

        DebuggerClientModule.removeListener(this);

        FBTrace.sysout("remoteSelector; SelectorModule.shutdown");
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // DebuggerClientModule Events

    onConnect: function(debuggerClient)
    {
        FBTrace.sysout("remoteSelector; SelectorModule.onConnect");
    },

    onDisconnect: function(debuggerClient)
    {
        FBTrace.sysout("remoteSelector; SelectorModule.onDisconnect");
    },

    onTabAttached: function(context)
    {
        FBTrace.sysout("remoteSelector; SelectorModule.onTabAttached; " + context.getName());
    },

    onTabDetached: function()
    {
        FBTrace.sysout("remoteSelector; SelectorModule.onTabDetached;");
    },

    onTabNavigated: function()
    {
        FBTrace.sysout("remoteSelector; SelectorModule.onTabNavigated;");
    },

    onThreadAttached: function(context)
    {
        FBTrace.sysout("remoteSelector; SelectorModule.onThreadAttached; " + context.getName());

        var packet = {
            to: context.tabClient._actor,
            type: "SelectorActor"
        }

        // DebuggerClient is globaly accessible. This object represents the connection
        // to the server.
        var client = Firebug.debuggerClient;
        client.request(packet, function(response)
        {
            FBTrace.sysout("remoteSelector; on selector actor received; " +
                context.getName(), response);

            // The selector is thread dependent so, store it into the context.
            // There is one thread and one context per browser tab.
            context.selectorClient = new SelectorClient(client, response.actor,
                context.activeThread);
        });
    },

    onThreadDetached: function(context)
    {
        FBTrace.sysout("remoteSelector; SelectorModule.onThreadDetached; " + context.getName());

        delete context.selectorClient;
    }
});

// ********************************************************************************************* //
// Registration

Firebug.registerModule(SelectorModule);

return SelectorModule;

// ********************************************************************************************* //
});
