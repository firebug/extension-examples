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
        FBTrace.sysout("remoteSelector; SelectorModule.onTabAttached; " +
            context.getName(), context);
    },

    onTabDetached: function()
    {
        FBTrace.sysout("remoteSelector; SelectorModule.onTabDetached;");
    },

    onTabNavigated: function()
    {
        FBTrace.sysout("remoteSelector; SelectorModule.onTabNavigated;");
    },

    onThreadAttached: function(context, reload)
    {
        var client = Firebug.debuggerClient;

        // Create client object for communication with the server actor.
        var selectorActorId = DebuggerClientModule.getActorId(context, "SelectorActor");
        context.selectorClient = new SelectorClient(client, selectorActorId, context);

        FBTrace.sysout("remoteSelector; SelectorModule.onThreadAttached; " +
            context.getName() + ", selector actor ID: " + selectorActorId);
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
