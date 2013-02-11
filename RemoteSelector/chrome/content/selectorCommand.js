/* See license.txt for terms of usage */

define([
    "firebug/firebug",
    "firebug/lib/object",
    "firebug/lib/trace",
],
function(Firebug, Obj, FBTrace) {

// ********************************************************************************************* //
// Constants

FBTrace = FBTrace.to("DBG_REMOTESELECTOR");

// ********************************************************************************************* //
// Implementation

var SelectorCommandAll =
{
    description: "Example of a remote command: document.querySelectorAll()",

    handler: function(context, args)
    {
        var client = context.selectorClient;
        if (!client)
            return "Selector client is not available in this context (yet?): " + context.getName();

        var selector = args.length > 0 ? args[0] : "*";
        client.querySelectorAll(selector, function(result)
        {
            // Firebug needs to pick the right template using supportsObject()
            // JSD2 remote objects doesn't use instanceof, they are based on 'type'
            // passed into the supportsObject() method. See Firebug.getRep() for more
            // information about how the 'type' is computed.
            Firebug.Console.log(result);
        });

        return Firebug.Console.getDefaultReturnValue(context.window);
    }
}

var SelectorCommand =
{
    description: "Example of a remote command: document.querySelector()",

    handler: function(context, args)
    {
        var client = context.selectorClient;
        if (!client)
            return "Selector client is not available in this context (yet?): " + context.getName();

        var selector = args.length > 0 ? args[0] : "*";
        client.querySelector(selector, function(result)
        {
            Firebug.Console.log(result);
        });

        return Firebug.Console.getDefaultReturnValue(context.window);
    }
}

// ********************************************************************************************* //
// Registration

Firebug.registerCommand("remoteselectall", SelectorCommandAll);
Firebug.registerCommand("remoteselect", SelectorCommand);

return SelectorCommand;

// ********************************************************************************************* //
});
