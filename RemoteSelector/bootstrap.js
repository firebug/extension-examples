/* See license.txt for terms of usage */

// ********************************************************************************************* //
// XPCOM

var Cc = Components.classes;
var Ci = Components.interfaces;
var Cu = Components.utils;

// ********************************************************************************************* //
// Constants

// Default preferences for bootstrap extensions are registered dynamically.
var defaultPrefs =
{
    "DBG_REMOTESELECTOR": true,
}

// ********************************************************************************************* //
// Firefox Bootstrap API

function install(data, reason) {}
function uninstall(data, reason) {}

function startup(data, reason)
{
    // Load default preferences.
    Cu.import("resource://firebug/prefLoader.js");
    PrefLoader.loadDefaultPrefs(data.installPath, "prefs.js");

    // Try to initialize this extension (sucessfull only if Firebug itself is already loaded)
    firebugStartup();
}

function shutdown(data, reason) { firebugShutdown(); }

// ********************************************************************************************* //
// Firebug Bootstrap API

function firebugStartup(params, reason)
{
    try
    {
        Cu.import("resource://firebug/loader.js");
        FirebugLoader.registerBootstrapScope(this);
    }
    catch (e)
    {
        //Cu.reportError(e);

        // If an exception happens it's probably because Firebug hasn't been
        // started yet. Just ignore it.
    }
}

function firebugShutdown()
{
    try
    {
        Cu.import("resource://firebug/loader.js");
        FirebugLoader.unregisterBootstrapScope(this);
    }
    catch (e)
    {
        Cu.reportError(e);
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //

function topWindowLoad(win)
{
    // TODO: overlay global browser window
}

function topWindowUnload(win)
{
    // TODO: remove global browser window overlays
}

function firebugFrameLoad(Firebug)
{
    Firebug.registerTracePrefix("remoteSelector;", "DBG_REMOTESELECTOR", true,
        "chrome://remoteselector/skin/remoteselector.css");

    Firebug.registerExtension("remoteselector", {
        id: "remoteselector@janodvarko.cz"
    });
}

function firebugFrameUnload(Firebug)
{
    if (!Firebug.isInitialized)
        return;

    Firebug.unregisterExtension("remoteselector");
    Firebug.unregisterTracePrefix("remoteSelector;");
}

function firebugServerLoad(Firebug, Server)
{
    Firebug.registerExtension("remoteselector", {
        id: "remoteselector@janodvarko.cz",
        main: "server"
    });
}

// ********************************************************************************************* //
