/* See license.txt for terms of usage */

define([
    "firebug/lib/trace",
    "hellobootamd/myPanel",
    "hellobootamd/myModule",
],
function(FBTrace, MyPanel, MyModule) {

// ********************************************************************************************* //
// Documentation

// Firebug coding style: http://getfirebug.com/wiki/index.php/Coding_Style
// Firebug tracing: http://getfirebug.com/wiki/index.php/FBTrace

// ********************************************************************************************* //
// The application/extension object

var theApp =
{
    initialize: function()
    {
        if (FBTrace.DBG_HELLOBOOTAMD)
            FBTrace.sysout("helloBootAMD; HelloBootAMD extension initialize");

        // Registration of Firebug panels and modules is made within appropriate files,
        // but it could be also done here.

        // TODO: Extension initialization
    },

    shutdown: function()
    {
        if (FBTrace.DBG_HELLOBOOTAMD)
            FBTrace.sysout("helloBootAMD; HelloBootAMD extension shutdown");

        // Unregister all registered Firebug components
        Firebug.unregisterPanel(Firebug.MyPanel);
        Firebug.unregisterModule(Firebug.MyModule);
        Firebug.unregisterStylesheet("chrome://hellobootamd/skin/hellobootamd.css");
        Firebug.unregisterStringBundle("chrome://hellobootamd/locale/hellobootamd.properties");

        // TODO: Extension shutdown
    }
}

// ********************************************************************************************* //

return theApp;

// ********************************************************************************************* //
});
