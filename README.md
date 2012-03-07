Firebug Extension Examples
==========================

This repo is intended to contain Firebug extension examples that demonstrate how to utilize
various Firebug extension API.

CacheListener
-------------
Firebug internal cache contains response bodies intercepted by Firebug. This extension shows
how to hook into a cache model and get copy of HTTP responses.

Related API:

    Firebug.TabCacheModel.addListener();
    Firebug.TabCacheModel.removeListener();


HelloAMD
--------
This extension shows how to use [AMD](http://wiki.commonjs.org/wiki/Modules/AsynchronousDefinition)
syntax within Firebug extension.

Related API:

    var config = {id: "helloamd@janodvarko.cz"};
    Firebug.registerExtension("helloamd", config);

TODO:

* The tracing listener usage must be updated (see HelloBootAMD).

Resources:

* [Firebug 1.10 Extension Architecture](http://getfirebug.com/wiki/index.php/Firebug_1.10_Extension_Architecture)

Requirements:

* Firebug 1.10+


HelloBootAMD
------------
Similarly to *HelloAMD* this extension shows how to use AMD and also demonstrates how to
create bootstrapped (restart-less) extension for Firebug. **This example is recommended to clone
when starting your own Firebug extension**

Related API:

    firebugStartup(); // called when Firebug is bootstrapped
    firebugShutdown(); // called when Firebug is uninstalled
    topWindowLoad(win); // called when a new browser window is opened
    topWindowUnload(win); // called when an existing browser window is closed
    firebugFrameLoad(Firebug); // called when Firebug UI is loaded into an existing browser window
    firebugFrameUnload(Firebug); // called when Firebug UI is unloaded from an existing browser window 

Resources:

* [Firebug 1.10 Extension Architecture](http://getfirebug.com/wiki/index.php/Firebug_1.10_Extension_Architecture)

Requirements:

* Firebug 1.10+

TODO:

* Remove the XUL support, which is not used and demonstrated by *HelloAMD* example.


HelloWorld
----------
This example represents old school architecture based on XUL overlay. Modern extensions should 
use AMD and bootstrapped API instead.


Infotip
-------
Learn how to create an info tip in your panel.

Related API:

    Firebug.InfoTip.addListener();
    Firebug.InfoTip.removeListener();
    function showInfoTip(infoTip, target, x, y) {};

TODO:

* Remove the showInfoTip from Firebug.InfoTab?

Resources:

* [Extending Firebug, Infotip (part XI.)](http://www.softwareishard.com/blog/firebug-tutorial/extending-firebug-infotip-part-xi/)

Requirements:

* Firebug 1.7+


Link Inspector
--------------
See what API is exposed by Firebug inspector. This example shows how to implement/customize
own inspector.

Related API:

    var inspectorListener =
    {
        onStartInspecting: function(context) {},
        onInspectNode: function(context, node) {},
        onStopInspecting: function(context, node, canceled) {}
    };
    Firebug.Inspector.addListener(inspectorListener);

Resources:

* [Extending Firebug, Inspector (part X.)](http://www.softwareishard.com/blog/firebug-tutorial/extending-firebug-inspector-part-x/)

Requirements:

* Firebug 1.7+


Net Listener
------------
See how to collect all network requests and also related info gathered and computed by Firebug's
Net panel.

Related API:

    Firebug.NetMonitor.addListener();
    Firebug.NetMonitor.removeListener();

Resources:

* [Extending Firebug, Net panel listener (part VIII.)](http://www.softwareishard.com/blog/firebug-tutorial/extending-firebug-net-panel-listener-part-viii/)

Requirements:

* Firebug 1.4+


SidePanel
---------
This example shows how to create a side panel.

Requirements:

* Firebug 1.4+


TabularUI
---------
See how to generate grid UI for tabular data in your extension. 

Related API:

    FirebugReps.Table;

Requirements:

* Firebug 1.10+


Toolbar
-------
Bootstrapped extension that shows how to create (customize) a toolbar and toolbar buttons in
Firebug without using XUL.

*This example also demonstrate how to register/unregister all extension's components such as
panels, modules, listeners, string bundles, etc.) within main module*

Related API:
    Firebug.chrome.appendToolbarButton();
    Firebug.Panel.getPanelToolbarButtons();

Requirements:

* Firebug 1.10+
