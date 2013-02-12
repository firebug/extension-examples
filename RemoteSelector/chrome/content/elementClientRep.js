/* See license.txt for terms of usage */

define([
    "firebug/firebug",
    "firebug/chrome/reps",
    "firebug/lib/object",
    "firebug/lib/trace",
    "firebug/lib/domplate",
    "firebug/html/inspector",
],
function(Firebug, Reps, Obj, FBTrace, Domplate, Inspector) {
with (Domplate) {

// ********************************************************************************************* //
// Constants

Trace = FBTrace.to("DBG_REMOTESELECTOR");
TraceError = FBTrace.to("DBG_ERRORS");

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

        var object = this.getRealObject(object);
        Inspector.highlightObject(object, context);
    },

    getRealObject: function(object)
    {
        try
        {
            // xxxHonza: access server side objects, of course even hacks needs
            // good architecure, refactor.
            // First option: implement a provider used by UI widgets (e.g. DomTree)
            // See: https://bugzilla.mozilla.org/show_bug.cgi?id=837723
            var client = object.getClient();
            var conn = DebuggerServer._connections["conn0."];
            var tabActor = conn.rootActor._tabActors.get(client.context.browser);
            var pool = tabActor.threadActor.threadLifetimePool;
            var actor = pool.get(client.grip.actor);
            return actor.obj;
        }
        catch (e)
        {
            TraceError.sysout("elementClientRep.getRealObject; EXCEPTION " + e, e);
        }
    },
});

// ********************************************************************************************* //
// Registration

Firebug.registerRep(ElementClientRep);

return ElementClientRep;

// ********************************************************************************************* //
}});
