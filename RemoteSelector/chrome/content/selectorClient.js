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

function SelectorClient(debuggerClient, actorId, threadClient)
{
    this.debuggerClient = debuggerClient;
    this.actorId = actorId;
    this.threadClient = threadClient;
}

SelectorClient.prototype =
{
    actor: null,

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Remote API

    querySelectorAll: function(selector, onResponse)
    {
        this.query(selector, "querySelectorAll", function (result)
        {
            var elements = [];
            for (var i=0; i<result.length; i++)
            {
                var client = new ElementClient(this.debuggerClient, result[i]);
                elements.push(client.getProxy());
            }
            onResponse(elements);
        });
    },

    querySelector: function(selector, onResponse)
    {
        this.query(selector, "querySelector", function (result)
        {
            var client = new ElementClient(this.debuggerClient, result);
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
