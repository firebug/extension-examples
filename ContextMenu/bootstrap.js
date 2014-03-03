/* See license.txt for terms of usage */

// ********************************************************************************************* //
// XPCOM

var {classes: Cc, interfaces: Ci, utils: Cu} = Components;
Cu.import("resource://gre/modules/Services.jsm");

// ********************************************************************************************* //
// Constants

const BOOTSTRAP_REASONS = [
    "", // the bootstrap reason is 1 based
    "APP_STARTUP",
    "APP_SHUTDOWN",
    "ADDON_ENABLE",
    "ADDON_DISABLE",
    "ADDON_INSTALL",
    "ADDON_UNINSTALL",
    "ADDON_UPGRADE",
    "ADDON_DOWNGRADE"
];

// ********************************************************************************************* //
// Firefox Bootstrap API

function install(data, reason) {}
function uninstall(data, reason) {}
function startup(data, reason) { firebugStartup(); }
function shutdown(data, reason) { firebugShutdown(); }

// ********************************************************************************************* //
// Firebug Bootstrap API

function firebugStartup()
{
    try
    {
        Cu.import("resource://firebug/loader.js");
        FirebugLoader.registerBootstrapScope(this);
    }
    catch (e)
    {
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

function topWindowLoad(win) {}
function topWindowUnload(win) {}

function firebugFrameLoad(Firebug)
{
    var config = {id: "contextmenu@janodvarko.cz"};
    Firebug.registerExtension("contextmenu", config);
}

function firebugFrameUnload(Firebug)
{
    if (!Firebug.isInitialized)
        return;

    Firebug.unregisterExtension("contextmenu");
}

// ********************************************************************************************* //
