/* See license.txt for terms of usage */

define([
    "firebug/lib/object",
    "firebug/lib/trace",
],
function(Obj, FBTrace) {

// ********************************************************************************************* //
// Constants

FBTrace = FBTrace.to("DBG_REMOTESELECTOR");

// ********************************************************************************************* //
// Implementation

function SelectorClient(connection, actor, threadClient)
{
    this.connection = connection;
    this.actor = actor;
    this.threadClient = threadClient;
}

SelectorClient.prototype =
{
    actor: null,

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Remote API

    querySelectorAll: function(selector, onResponse)
    {
        var self = this;
        var doQuery = function(callback)
        {
            var packet = {
                to: self.actor,
                type: "querySelectorAll",
                selector: selector
            };

            self.connection.request(packet, function(response)
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

        if (this.threadClient.isPaused())
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
