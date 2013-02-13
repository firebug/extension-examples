/* See license.txt for terms of usage */

define([
    "firebug/firebug",
    "firebug/chrome/reps",
    "firebug/lib/object",
    "firebug/lib/trace",
    "firebug/lib/domplate",
    "firebug/html/inspector",
    "firebug/remoting/debuggerClientModule",
],
function(Firebug, Reps, Obj, FBTrace, Domplate, Inspector, DebuggerClientModule) {
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
        // Highilghter is not remotabel so, let's get local access to the underlying
        // JS object. Notice that this breaks client-server concept.
        var client = object.getClient();
        return DebuggerClientModule.getObject(client.context, client.grip.actor);
    },
});

// ********************************************************************************************* //
// Registration

Firebug.registerRep(ElementClientRep);

return ElementClientRep;

// ********************************************************************************************* //
}});
