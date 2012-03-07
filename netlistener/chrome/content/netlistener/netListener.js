FBL.ns(function() { with (FBL) { 

const Cc = Components.classes;
const Ci = Components.interfaces;

const dirService = Cc["@mozilla.org/file/directory_service;1"]
    .getService(Ci.nsIProperties);

// ************************************************************************************************
// Module implementation

Firebug.NetListenerModule = extend(Firebug.Module,
{
    initialize: function(owner)
    {
        Firebug.Module.initialize.apply(this, arguments);

        // Register NetMonitor listener
        this.netListener = new NetListener();
        Firebug.NetMonitor.addListener(this.netListener);

        Firebug.NetMonitor.NetRequestTable.addListener(RequestTableListener);
        Firebug.JSONViewerModel.addListener(JSONListener);
    },

    shutdown: function()
    {
        Firebug.Module.shutdown.apply(this, arguments);

        // Unregister NetMonitor listener
        Firebug.NetMonitor.removeListener(this.netListener);
        this.netListener.outputStream.close();

        Firebug.NetMonitor.NetRequestTable.removeListener(RequestTableListener);
        Firebug.JSONViewerModel.removeListener(JSONListener);
    }
});

// ************************************************************************************************
// Net Panel Listener

function NetListener(outputStream)
{
    // Get unique file within user profile directory. 
    var file = dirService.get("ProfD", Ci.nsIFile);
    file.append("netlistener");
    file.append("netMonitor.txt");
    file.createUnique(Ci.nsIFile.NORMAL_FILE_TYPE, 0666);

    // Initialize output stream.
    this.outputStream =
        Cc["@mozilla.org/network/file-output-stream;1"]
        .createInstance(Ci.nsIFileOutputStream);

    // write, create, truncate
    this.outputStream.init(file, 0x02 | 0x08 | 0x20, 0666, 0);
}

NetListener.prototype = 
{
    onRequest: function(context, file)
    {
        if (FBTrace.DBG_NETLISTENER)
            FBTrace.sysout("netListener.onResponse; " + (file ? file.href : ""));
    },

    onExamineResponse: function(context, request)
    {
        if (FBTrace.DBG_NETLISTENER)
            FBTrace.sysout("netListener.onExamineResponse;" + request.name);
    },

    onResponse: function(context, file)
    {
        if (FBTrace.DBG_NETLISTENER)
            FBTrace.sysout("netListener.onResponse; " + (file ? file.href : ""));

        try
        {
            var text = file.href + " (" + formatTime
                (file.endTime - file.startTime) + ")\n";
            this.outputStream.write(text, text.length);
        }
        catch (err)
        {
            if (FBTrace.DBG_NETLISTENER || FBTRace.DBG_ERRORS)
                FBTrace.sysout("netListener.onResponse; EXCEPTION", err);
        }
    },

    onResponseBody: function(context, file)
    {
        if (FBTrace.DBG_NETLISTENER)
            FBTrace.sysout("netListener.onResponseBody; " + (file ? file.href : ""), file);
    }
};

var RequestTableListener = 
{
    onCreateRequestEntry: function(panel, row)
    {
        if (FBTrace.DBG_NETLISTENER)
            FBTrace.sysout("RequestTableListener.onCreateRequestEntry; " +
                panel.context.getName());
    }
}

var JSONListener =
{
    onParseJSON: function(file)
    {
        if (FBTrace.DBG_NETLISTENER)
            FBTrace.sysout("JSONListener.onParseJSON; " + file.href, file);
    }
}

// ************************************************************************************************
// Registration

Firebug.registerModule(Firebug.NetListenerModule);

// ************************************************************************************************
}});
