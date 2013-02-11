/* See license.txt for terms of usage */

define([
    "firebug/lib/object",
    "firebug/lib/trace",
    "firebug/debugger/grips/objectGrip",
],
function(Obj, FBTrace, ObjectGrip) {

// ********************************************************************************************* //
// Constants

FBTrace = FBTrace.to("DBG_REMOTESELECTOR");

var Cc = Components.classes;
var Ci = Components.interfaces;
var Cu = Components.utils;

// ********************************************************************************************* //
// Implementation

function ElementClient(debuggerClient, grip, threadClient)
{
    this.debuggerClient = debuggerClient;
    this.grip = grip;
    this.threadClient = threadClient;

    var self = this;

    // xxxHonza: helper methods, could cause collisions.
    this.grip.getType = function() { return "remoteElement"; };
    this.grip.getClient = function() { return self; };
}

ElementClient.prototype = Object.create(ObjectGrip.prototype);
ElementClient.prototype = Obj.extend(ElementClient.prototype,
{
    actor: null,

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //

    getProxy: function()
    {
        // Firebug UI deals with the grip object.
        return this.grip;
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Remote API

    getStyles: function(onResponse)
    {
        // xxxHonza:
    },
});

// ********************************************************************************************* //
// Registration

return ElementClient;

// ********************************************************************************************* //
});
