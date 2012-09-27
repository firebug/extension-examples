/* See license.txt for terms of usage */

define([
    "firebug/lib/trace",
    "remoteselector/selectorActor",
],
function(FBTrace, SelectorActor) {

// ********************************************************************************************* //
// Constants

var Cc = Components.classes;
var Ci = Components.interfaces;
var Cu = Components.utils;

// ********************************************************************************************* //
// The application/extension object

var theServer =
{
    initialize: function()
    {
        FBTrace.sysout("remoteSelector; Server side initialized " + selectorActor);

        // Server actor is already loaded since it's specified as dependency of this module.
    },

    shutdown: function()
    {
        FBTrace.sysout("remoteSelector; Extension shutdown");
    }
}

// ********************************************************************************************* //

return theServer;

// ********************************************************************************************* //
});
