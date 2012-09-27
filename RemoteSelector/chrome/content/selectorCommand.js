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

var SelectorCommand =
{
    description: "Example of a remote command",

    handler: function(context, args)
    {
        var panel = context.getPanel("remoteSelector");
        var client = panel.selectorClient;
        if (!client)
            return "Selector client is not available in this context (yet?): " + context.getName();

        var selector = args.length > 0 ? args[0] : "*";
        client.querySelectorAll(selector, function(result)
        {
            Firebug.Console.log(result);
        });

        return Firebug.Console.getDefaultReturnValue(context.window);
    }
}

// ********************************************************************************************* //
// Registration

Firebug.registerCommand("remoteselect", SelectorCommand);

return SelectorCommand;

// ********************************************************************************************* //
});
