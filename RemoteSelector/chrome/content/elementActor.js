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

Cu.import("resource://gre/modules/devtools/dbg-server.jsm");

// ********************************************************************************************* //
// Implementation

function ElementActor(aObj, aThreadActor)
{
    this.obj = aObj;
    this.threadActor = aThreadActor;
}

ElementActor.prototype = Object.create(DebuggerServer.ObjectActor.prototype);
ElementActor.prototype = Obj.extend(ElementActor.prototype,
{
    constructor: ElementActor,
    actorPrefix: "element",

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //

    grip: function()
    {
        // Collect all information that are needed for FirebugReps.Element template.
        // This is the basic set that needs to be immediatelly available so, an element
        // can be properly displayed in Firebug UI.
        // Consequent asynchronous queries should be done mostly for children or parents
        // (which will be needed for the HTML panel).
        var classList = [];
        if (this.obj.classList.length > 0)
            classList = this.obj.classList.toString().split(" ");

        var attrs = [];
        var attributes = this.obj.attributes;
        for (var i=0; i<attributes.length; i++)
        {
            var attr = attributes[i];
            attrs.push({
                localName: attr.localName,
                value: attr.value,
            });
        }

        var localName = this.obj.tagName.toLowerCase();

        return {
            "type": "object",
            "class": "HTMLElement",
            "localName": localName,
            "nodeName": localName,
            "actor": this.actorID,
            "id": this.obj.id,
            "classList": classList,
            "attributes": attrs,
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
