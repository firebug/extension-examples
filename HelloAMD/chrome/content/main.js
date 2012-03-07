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
        // Register trace customization listener for FBTrace. DBG_HELLOAMD represents a CSS rule
        // that is automatially associated with all logs prefixed with "helloAMD;".
        // The prefix is removed (third parameter is true).
        // The last parameter represents URL of the stylesheet that should be used by
        // the tracing console.
        this.traceListener = new TraceListener("helloAMD;", "DBG_HELLOAMD", true,
            "resource://helloamd/skin/classic/helloamd.css");
        TraceModule.addListener(this.traceListener);

        if (FBTrace.DBG_HELLOAMD)
            FBTrace.sysout("helloAMD; HelloAMD extension initialize");

        // TODO: Extension initialization
    },

    shutdown: function()
    {
        if (FBTrace.DBG_HELLOAMD)
            FBTrace.sysout("helloAMD; HelloAMD extension shutdown");

        // TODO: Extension shutdown

        TraceModule.removeListener(this.traceListener);
    }
}

return theApp;

// ********************************************************************************************* //
});
