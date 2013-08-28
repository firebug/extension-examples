/* See license.txt for terms of usage */

define([
    "firebug/lib/object",
    "firebug/lib/trace",
],
function(Obj, FBTrace) {

"use strict";

// ********************************************************************************************* //
// Custom Panel Implementation

function MyPanel() {};
MyPanel.prototype = Obj.extend(Firebug.Panel,
{
    name: "myPanel",
    title: "My Panel",
});

// ********************************************************************************************* //
// Registration

Firebug.registerPanel(MyPanel);

return MyPanel;

// ********************************************************************************************* //
});
