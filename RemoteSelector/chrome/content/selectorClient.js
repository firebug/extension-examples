/* See license.txt for terms of usage */

define([
    "firebug/lib/object",
    "firebug/lib/trace",
    "remoteselector/elementClient",
],
function(Obj, FBTrace, ElementClient) {

// ********************************************************************************************* //
// Constants

FBTrace = FBTrace.to("DBG_REMOTESELECTOR");

// ********************************************************************************************* //
// Implementation

function SelectorClient(debuggerClient, actorId, context)
{
    this.debuggerClient = debuggerClient;
    this.actorId = actorId;
    this.context = context;
    this.threadClient = context.activeThread;
}

SelectorClient.prototype =
{
    actor: null,

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Remote API

    querySelectorAll: function(selector, onResponse)
    {
        var self = this;
        this.query(selector, "querySelectorAll", function (result)
        {
            var elements = [];
            for (var i=0; i<result.length; i++)
            {
                var client = new ElementClient(result[i], self.context);
                elements.push(client.getProxy());
            }
            onResponse(elements);
        });
    },

    querySelector: function(selector, onResponse)
    {
        var self = this;
        this.query(selector, "querySelector", function (result)
        {
            var client = new ElementClient(result, self.context);
            onResponse(client.getProxy());
        });
    },

    query: function(selector, type, onResponse)
    {
        var self = this;
        var doQuery = function(callback)
        {
            var packet = {
                to: self.actorId,
                type: type,
                selector: selector
            };

            self.debuggerClient.request(packet, function(response)
            {
                // Ignoring errors?
                if (onResponse)
                {
                    var result = response.result;
                    if (callback)
                        callback(onResponse(result));
                    else
                        onResponse(result);
                }
            });
        };

        if (this.threadClient.paused)
        {
            doQuery();
            return;
        }

        this.threadClient.interrupt(function(response)
        {
            if (response.error)
            {
                onResponse(response);
                return;
            }

            doQuery(self.threadClient.resume.bind(self.threadClient));
        });
    },
};

// ********************************************************************************************* //
// Registration

return SelectorClient;

// ********************************************************************************************* //
});
