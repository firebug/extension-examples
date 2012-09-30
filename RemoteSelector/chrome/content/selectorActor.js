/* See license.txt for terms of usage */

define([
    "firebug/lib/object",
    "firebug/lib/trace",
    "remoteselector/elementActor",
],
function(Obj, FBTrace, ElementActor) {

// ********************************************************************************************* //
// Constants

FBTrace = FBTrace.to("DBG_REMOTESELECTOR");

var Cc = Components.classes;
var Ci = Components.interfaces;
var Cu = Components.utils;

Cu.import("resource:///modules/devtools/dbg-server.jsm");

// ********************************************************************************************* //
// Implementation

function SelectorActor(conn, tab)
{
    this.conn = conn || tab.conn;
    this.tab = tab;
}

SelectorActor.prototype =
{
    actorPrefix: "selector",

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Clean up

    disconnect: function()
    {
        FBTrace.sysout("remoteSelector;SelectorActor.disconnect");

        this.conn.removeActorPool(this.objectActorsPool);
        this.objectActorsPool = null;
    },

    exit: function()
    {
        FBTrace.sysout("remoteSelector;SelectorActor.exit");
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //

    grip: function()
    {
        return {
            actor: this.actorID, // actorID is set when you add the actor to a pool.
        };
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // API

    onQuerySelectorAll: function(request)
    {
        var doc = this.tab.browser.contentDocument;
        var result = doc.querySelectorAll(request.selector);

        FBTrace.sysout("remoteSelector;SelectorActor.onQuerySelectorAll " +
            doc.location, result);

        var pool = this.tab.threadActor.threadLifetimePool;

        var grips = [];
        for (var i=0; i<result.length; i++)
            grips.push(this.elementGrip(result[i], pool));

        // The "from" attribute is not provided, the protocol handler will
        // add that for us.
        return {"result": grips};
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //

    elementGrip: function TA_objectGrip(aValue, aPool)
    {
        if (!aPool.objectActors)
            aPool.objectActors = new WeakMap();

        if (aPool.objectActors.has(aValue))
            return aPool.objectActors.get(aValue).grip();

        var actor = new ElementActor(aValue, this.tab.threadActor);
        aPool.addActor(actor);
        aPool.objectActors.set(aValue, actor);
        return actor.grip();
    },
};

SelectorActor.prototype.requestTypes =
{
    "querySelectorAll": SelectorActor.prototype.onQuerySelectorAll
};

// Bug 792925 - Dynamically-added tab-scoped actors should get a reference to their parent
// DebuggerServer.addTabActor(SelectorActor, "selectorActor");

// xxxHonza: this is here till the bug 792925 is fixed
function selectorActorHandler(tab, request)
{
    var actor = new SelectorActor(null, tab);
    tab.tabActorPool.addActor(actor);
    return actor.grip();
}

DebuggerServer.addTabRequest("SelectorActor", selectorActorHandler);

// ********************************************************************************************* //
// Registration

return SelectorActor;

// ********************************************************************************************* //
});
