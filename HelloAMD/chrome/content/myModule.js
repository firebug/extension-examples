/* See license.txt for terms of usage */

define([
    "firebug/lib/object",
    "firebug/lib/trace",
],
function(Obj, FBTrace) {

// ********************************************************************************************* //
// Custom Module Implementation

var MyModule = Obj.extend(Firebug.Module,
{
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Initialization

    initialize: function(owner)
    {
        Firebug.Module.initialize.apply(this, arguments);

        // TODO: Module initialization (there is one module instance per browser window)

        if (FBTrace.DBG_HELLOAMD)
            FBTrace.sysout("helloAMD; MyModule.initialize");
    },

    shutdown: function()
    {
        Firebug.Module.shutdown.apply(this, arguments);

        if (FBTrace.DBG_HELLOAMD)
            FBTrace.sysout("helloAMD; MyModule.shutdown");
    },
});

// ********************************************************************************************* //
// Registration

Firebug.registerModule(MyModule);

return MyModule;

// ********************************************************************************************* //
});
