/* See license.txt for terms of usage */

define([
    "firebug/lib/object",
    "firebug/lib/trace",
],
function(Obj, FBTrace) {

"use strict";

// ********************************************************************************************* //
// Custom Panel Implementation

function MySidePanel() {};
MySidePanel.prototype = Obj.extend(Firebug.Panel,
{
    name: "mySidePanel",
    parentPanel: "myPanel",
    title: "My Side Panel",
});

// ********************************************************************************************* //
// Registration

Firebug.registerPanel(MySidePanel);

return MySidePanel;

// ********************************************************************************************* //
});
