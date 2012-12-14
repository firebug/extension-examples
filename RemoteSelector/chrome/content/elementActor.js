/* See license.txt for terms of usage */

define([
    "firebug/lib/object",
    "firebug/lib/trace",
],
function(Obj, FBTrace) {

// ********************************************************************************************* //
// Constants

FBTrace = FBTrace.to("DBG_REMOTESELECTOR");

var Cc = Components.classes;
var Ci = Components.interfaces;
var Cu = Components.utils;

Cu.import("resource:///modules/devtools/dbg-server.jsm");

//xxxHonza: it should be easier to get the built-in data types.
function loadSubScript(aURL)
{
  try {
    let loader = Cc["@mozilla.org/moz/jssubscript-loader;1"]
      .getService(Ci.mozIJSSubScriptLoader);
    loader.loadSubScript(aURL, this);
  } catch(e) {
    dump("Error loading: " + aURL + ": " + e + " - " + e.stack + "\n");
    throw e;
  }
}

//Load the debugging server in a sandbox with its own compartment.
var systemPrincipal = Cc["@mozilla.org/systemprincipal;1"].createInstance(Ci.nsIPrincipal);
var DBGServer = Cu.Sandbox(systemPrincipal);
DBGServer.importFunction(loadSubScript);
try {
    DBGServer.loadSubScript("chrome://global/content/devtools/dbg-script-actors.js");
} catch (e) {
    //xxxHonza: ignore the exception 'Debugger not defined'
}

// ********************************************************************************************* //
// Implementation

function ElementActor(aObj, aThreadActor)
{
    this.obj = aObj;
    this.threadActor = aThreadActor;
}

ElementActor.prototype = Object.create(DBGServer.ObjectActor.prototype);
ElementActor.prototype = Obj.extend(ElementActor.prototype,
{
    constructor: ElementActor,
    actorPrefix: "element",

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //

    grip: function()
    {
        return {
            "type": "object",
            "class": this.obj.tagName,
            "actor": this.actorID
        };
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // API

    onAttributes: function(request)
    {
        FBTrace.sysout("remoteSelector;ElementActor.onAttributes " +
            this.obj.tagName, this.obj);

        var attrs = {};
        var attributes = this.obj.attributes;
        for (var i=0; i<attributes.length; i++)
        {
            var attr = attributes[i];
            attrs[attr.nodeName] = this.attributeDescriptor(attr);
        }

        // The "from" attribute is not provided, the protocol handler will
        // add that for us.
        return {"attributes": attrs};
    },

    attributeDescriptor: function(attr)
    {
        var descriptor = {};
        descriptor.value = this.threadActor.createValueGrip(attr.nodeValue);
        return descriptor;
    },
});

ElementActor.prototype.requestTypes =
{
    "attributes": ElementActor.prototype.onAttributes
};

// ********************************************************************************************* //
// Registration

return ElementActor;

// ********************************************************************************************* //
});
