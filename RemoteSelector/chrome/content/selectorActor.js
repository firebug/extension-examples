/* See license.txt for terms of usage */

define([
    "firebug/lib/object",
    "firebug/lib/trace",
],
function(Obj, FBTrace) {

// ********************************************************************************************* //
// Constants

var Cc = Components.classes;
var Ci = Components.interfaces;
var Cu = Components.utils;

Cu.import("resource:///modules/devtools/dbg-server.jsm");

// ********************************************************************************************* //
// Implementation

function SelectorActor(conn, tab)
{
    FBTrace.sysout("remoteSelector; constructor", arguments);

    this.conn = conn || tab.conn;
    this.tab = tab;
}

SelectorActor.prototype =
{
    actorPrefix: "selector",

    grip: function()
    {
        return {
            actor: this.actorID, // actorID is set when you add the actor to a pool.
        };
    },

    onQuerySelectorAll: function(request)
    {
        var doc = this.tab.browser.contentDocument;
        var result = doc.querySelectorAll(request.selector);

        FBTrace.sysout("remoteSelector;SelectorActor.onQuerySelectorAll " +
            doc.location, result);

        var elems = [];
        for (var i=0; i<result.length; i++)
            elems.push(result[i].tagName);

        // The "from" attribute is not provided, the protocol handler will
        // add that for us.
        return {"result": elems.join(",")};
    },

    disconnect: function()
    {
        FBTrace.sysout("remoteSelector;SelectorActor.disconnect");
    },

    exit: function()
    {
        FBTrace.sysout("remoteSelector;SelectorActor.exit");
    }
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
