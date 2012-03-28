/* See license.txt for terms of usage */

define([
    "firebug/lib/trace",
    "firebug/trace/traceModule",
    "firebug/trace/traceListener",
    "helloamd/myPanel",
    "helloamd/myModule",
],
function(FBTrace, TraceModule, TraceListener) {

// ********************************************************************************************* //
// Documentation
//
// Firebug coding style: http://getfirebug.com/wiki/index.php/Coding_Style
// Firebug tracing: http://getfirebug.com/wiki/index.php/FBTrace

// ********************************************************************************************* //
// The application/extension object

var theApp =
{
    initialize: function()
    {
        if (FBTrace.DBG_HELLOAMD)
            FBTrace.sysout("helloAMD; HelloAMD extension initialize");

        // TODO: Extension initialization
    },

    shutdown: function()
    {
        if (FBTrace.DBG_HELLOAMD)
            FBTrace.sysout("helloAMD; HelloAMD extension shutdown");

        // TODO: Extension shutdown
    }
}

return theApp;

// ********************************************************************************************* //
});
