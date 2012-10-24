/* See license.txt for terms of usage */

define([
    "firebug/firebug",
    "firebug/lib/trace",
    "remoteselector/selectorModule",
    "remoteselector/selectorCommand",
    "remoteselector/selectorActor",
    "remoteselector/selectorClient",
],
function(Firebug, FBTrace, SelectorModule, SelectorCommand, SelectorActor, SelectorClient) {

// ********************************************************************************************* //
// Constants

FBTrace = FBTrace.to("DBG_REMOTESELECTOR");

// ********************************************************************************************* //
// The application/extension object

var theExtension =
{
    initialize: function()
    {
        FBTrace.sysout("remoteSelector; RemoteSelector extension initialize");

        // Registration of Firebug panels and modules is made within appropriate files,
        // but it could be also done here.

        Firebug.registerStylesheet("chrome://remoteselector/skin/remoteselector.css");
        Firebug.registerStringBundle("chrome://remoteselector/locale/remoteselector.properties");
    },

    shutdown: function()
    {
        FBTrace.sysout("remoteSelector; RemoteSelector extension shutdown");

        // Unregister all registered Firebug components
        Firebug.unregisterModule(SelectorModule);
        Firebug.unregisterStylesheet("chrome://remoteselector/skin/remoteselector.css");
        Firebug.unregisterStringBundle("chrome://remoteselector/locale/remoteselector.properties");
    }
}

// ********************************************************************************************* //

return theExtension;

// ********************************************************************************************* //
});
