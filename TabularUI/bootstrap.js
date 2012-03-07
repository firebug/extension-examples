/* See license.txt for terms of usage */

// ********************************************************************************************* //
// XPCOM

var {classes: Cc, interfaces: Ci, utils: Cu} = Components;

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
    var config = {id: "tabularui@janodvarko.cz"};
    Firebug.registerExtension("tabularui", config);
}

function firebugFrameUnload(Firebug)
{
    if (!Firebug.isInitialized)
        return;

    Firebug.unregisterExtension("tabularui");
}

// ********************************************************************************************* //
