/* See license.txt for terms of usage */

define([
    "firebug/firebug",
    "firebug/chrome/reps",
    "firebug/lib/object",
    "firebug/lib/trace",
    "firebug/lib/domplate",
    "remoteselector/elementClient",
    "firebug/html/inspector",
],
function(Firebug, Reps, Obj, FBTrace, Domplate, ElementClient, Inspector) {
with (Domplate) {

// ********************************************************************************************* //
// Constants

FBTrace = FBTrace.to("DBG_REMOTESELECTOR");

var Cc = Components.classes;
var Ci = Components.interfaces;
var Cu = Components.utils;

Cu["import"]("resource://gre/modules/devtools/dbg-server.jsm");

// ********************************************************************************************* //
// Implementation

var ElementClientRep = domplate(Reps.Element,
{
    supportsObject: function(object, type)
    {
        return type == "remoteElement";
    },

    highlightObject: function(object, context, target)
    {
        if (this.ignoreTarget(target))
            return;

        // xxxHonza: access server side objects, of course even hacks needs
        // good architecure, refactor.
        // See: https://bugzilla.mozilla.org/show_bug.cgi?id=837723
        var client = object.getClient();
        var threadClient = client.threadClient;
        var conn = DebuggerServer._connections["conn0."];
        var rootActor = conn.rootActor;
        var tabActor = rootActor._tabActors.get(context.browser);
        var threadActor = tabActor.threadActor;
        var pool = threadActor.threadLifetimePool;
        var actor = pool.get(client.grip.actor);
        var object = actor.obj;

        //xxxHonza: in case of Debugger Object.
        //See https://bugzilla.mozilla.org/show_bug.cgi?id=837723
        //var object = actor.obj.unsafeDereference();

        Inspector.highlightObject(object, context);
    },
});

// ********************************************************************************************* //
// Registration

Firebug.registerRep(ElementClientRep);

return ElementClientRep;

// ********************************************************************************************* //
}});
