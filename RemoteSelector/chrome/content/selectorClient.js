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

function SelectorClient(connection, actor)
{
    this.connection = connection;
    this.actor = actor;
}

SelectorClient.prototype =
{
    actor: null,

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Remote API

    querySelectorAll: function(selector, onResponse)
    {
        var packet = {
            to: this.actor,
            type: "querySelectorAll",
            selector: selector,
        };

        this.connection.request(packet, function(response)
        {
            if (!onResponse)
                return;

            var result = response.result.split(",");
            onResponse(result);
        });
    }
};

// ********************************************************************************************* //
// Registration

return SelectorClient;

// ********************************************************************************************* //
});
