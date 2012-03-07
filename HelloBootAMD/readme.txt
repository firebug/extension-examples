/* See license.txt for terms of usage */

Author: Jan Odvarko, odvarko@gmail.com

This extension serves as an example and proof of concept for restart-less
(bootstrapped) support APIs in Firebug 1.10

== Build Extension == 
Run 'ant' command in the extension's directory and look for: hellobootamd-0.5.1.xpi
(see build.xml for more)

== TODO == 
* Improve Firebug API for updating tab bar
   - the extension needs to explicitly call Firebug.chrome.syncMainPanels();
   - could it be automated

* Make sure removed panel is no longer selected
   - the extension needs to explicitly call win.Firebug.chrome.selectPanel("html");
   - could it be automated

* Firebug.Module.initialize event is not distributed to dynamically registered modules
   - what about other modules?
