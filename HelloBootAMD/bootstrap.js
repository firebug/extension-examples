/* See license.txt for terms of usage */

// ********************************************************************************************* //
// XPCOM

var {classes: Cc, interfaces: Ci, utils: Cu} = Components;

// ********************************************************************************************* //
// Constants

// Default preferences for bootstrap extensions are registered dynamically.
var defaultPrefs =
{
    "DBG_HELLOBOOTAMD": true,
}

// ********************************************************************************************* //
// Firefox Bootstrap API

function install(data, reason) {}
function uninstall(data, reason) {}
function startup(data, reason) { firebugStartup(); }
function shutdown(data, reason) { firebugShutdown(); }

// ********************************************************************************************* //
// Firebug Bootstrap API

/**
 * Executed by Firebug framework when Firebug is started. Since the order of Firebug
 * and its bootstrapped extensions is not guaranteed this function is executed twice
 * (of course the registration happens just once):
 *
 * 1) When Firebug is loaded
 * 2) When this extension is loaded
 *
 * If Firebug is not loaded an exception happens
 */
function firebugStartup()
{
    try
    {
        Cu.import("resource://firebug/loader.js");
        FirebugLoader.registerBootstrapScope(this);
        FirebugLoader.registerDefaultPrefs(defaultPrefs);
    }
    catch (e)
    {
        // If an exception happens it's probably because Firebug hasn't been
        // started yet. Just ignore it.
    }
}

/**
 * Executed by Firefox when this extension shutdowns.
 */
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

/**
 * Executed by Firebug framework for every browser window. Use this function to append
 * any new elements into the browser window (browser.xul). Don't forget to remove
 * these elements in topWindowUnload.
 * 
 * @param {Window} win The browser window
 */
function topWindowLoad(win)
{
    // TODO: overlay global browser window
}

/**
 * Executed by Firebug framework when this extension
 * @param {Object} win
 */
function topWindowUnload(win)
{
    // TODO: remove global browser window overlays
}

/**
 * Entire Firebug UI is running inside an iframe (firebugFrame.xul). This function
 * is executed by Firebug framework when the frame is loaded. This happens when
 * the user requires Firebug for the first time (doesn't have to happen during the
 * Firefox session at all)
 * 
 * @param {Window} win The Firebug window
 */
function firebugFrameLoad(Firebug)
{
    // Register trace listener the customizes trace logs coming from this extension
    // * helloBootAMD; is unique prefix of all messages that should be customized.
    // * DBG_HELLOBOOTAMD is a class name with style defined in the specified stylesheet.
    Firebug.registerTracePrefix("helloBootAMD;", "DBG_HELLOBOOTAMD", true,
        "chrome://hellobootamd/skin/hellobootamd.css");

    // The registration process will automatically look for 'main' module and load it.
    // The is the same what happens in a XUL overlay applied on:
    // chrome://firebug/content/firebugOverlay.xul
    var config = {id: "hellobootamd@janodvarko.cz"};
    Firebug.registerExtension("hellobootamd", config);
}

function firebugFrameUnload(Firebug)
{
    if (!Firebug.isInitialized)
        return;

    Firebug.unregisterExtension("hellobootamd");
    Firebug.unregisterTracePrefix("helloBootAMD;");
}

// ********************************************************************************************* //
