FBL.ns(function() { with (FBL) { 

const Cc = Components.classes;
const Ci = Components.interfaces;

// ************************************************************************************************
// Module implementation

Firebug.CacheListenerModule = extend(Firebug.Module,
{
    initialize: function()
    {
        if (FBTrace.DBG_CACHELISTENER)
            FBTrace.sysout("Firebug.CacheListenerModule.initialize;");

        Firebug.Module.initialize.apply(this, arguments);

        // Register cache listener
        this.cacheListener = new CacheListener();
        Firebug.TabCacheModel.addListener(this.cacheListener);
    },

    shutdown: function()
    {
        if (FBTrace.DBG_CACHELISTENER)
            FBTrace.sysout("Firebug.CacheListenerModule.shutdown;");

        Firebug.Module.shutdown.apply(this, arguments);

        // Unregister cache listener
        Firebug.TabCacheModel.removeListener(this.cacheListener);
    }
});

// ************************************************************************************************
// Net Panel Listener

function CacheListener()
{
}

CacheListener.prototype = 
{
    onStartRequest: function(context, request, requestContext)
    {
        if (FBTrace.DBG_CACHELISTENER)
            FBTrace.sysout("cacheListener.onStartRequest: " + safeGetName(request));
    },

    onDataAvailable: function(context, request, requestContext, inputStream, offset, count)
    {
        try
        {
            var binaryInputStream = CCIN("@mozilla.org/binaryinputstream;1", "nsIBinaryInputStream");
            var storageStream = CCIN("@mozilla.org/storagestream;1", "nsIStorageStream");
            var binaryOutputStream = CCIN("@mozilla.org/binaryoutputstream;1", "nsIBinaryOutputStream");

            binaryInputStream.setInputStream(inputStream.value);
            storageStream.init(8192, count, null);
            binaryOutputStream.setOutputStream(storageStream.getOutputStream(0));

            var data = binaryInputStream.readBytes(count);
            binaryOutputStream.writeBytes(data, count);

            if (FBTrace.DBG_CACHELISTENER)
                FBTrace.sysout("cacheListener.onDataAvailable: " + safeGetName(request), data);

            // Let other listeners use the stream.
            inputStream.value = storageStream.newInputStream(0);
        }
        catch (err)
        {
            if (FBTrace.DBG_CACHELISTENER)
                FBTrace.sysout("cacheListener.onDataAvailable: ERROR " + safeGetName(request), err);
        }
    },

    onStopRequest: function(context, request, requestContext, statusCode)
    {
        if (FBTrace.DBG_CACHELISTENER)
            FBTrace.sysout("cacheListener.onStopRequest: " + safeGetName(request));
    }
};

function safeGetName(request)
{
    try
    {
        return request.name;
    }
    catch (exc)
    {
        return null;
    }
}

// ************************************************************************************************
// Registration

Firebug.registerModule(Firebug.CacheListenerModule);

// ************************************************************************************************
}});
