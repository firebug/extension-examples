/* See license.txt for terms of usage */

define([
    "firebug/lib/object",
    "firebug/lib/trace",
    "firebug/lib/locale",
    "firebug/lib/domplate",
    "firebug/lib/dom",
    "firebug/lib/dragdrop",
],
function(Obj, FBTrace, Locale, Domplate, Dom, DragDrop) {

"use strict";

// ********************************************************************************************* //
// Custom Panel Implementation

function MyPanel() {};
MyPanel.prototype = Obj.extend(Firebug.Panel,
{
    name: "panelsplitter",
    title: "Panel with a splitter",

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Initialization

    initialize: function()
    {
        Firebug.Panel.initialize.apply(this, arguments);
        this.refresh();
    },

    destroy: function(state)
    {
        Firebug.Panel.destroy.apply(this, arguments);
    },

    refresh: function()
    {
        this.MyTemplate.render(this.panelNode);

        // Initialize panel splitter
        var handler = this.panelNode.querySelector(".myResizer");
        this.resizer = new DragDrop.Tracker(handler, {
            onDragStart: Obj.bind(this.onDragStart, this),
            onDragOver: Obj.bind(this.onDragOver, this),
            onDrop: Obj.bind(this.onDrop, this)
        });
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Splitter

    onDragStart: function(tracker)
    {
        var body = Dom.getBody(this.document);
        body.setAttribute("resizingHtmlPreview", "true");

        var topPane = this.panelNode.querySelector(".topPane");
        this.startHeight = topPane.clientHeight;
    },

    onDragOver: function(newPos, tracker)
    {
        var newHeight = (this.startHeight + newPos.y);
        var topPane = this.panelNode.querySelector(".topPane");
        topPane.style.height = newHeight + "px";
    },

    onDrop: function(tracker)
    {
        var body = Dom.getBody(this.document);
        body.removeAttribute("resizingHtmlPreview");
    },
});

// ********************************************************************************************* //
// Panel UI (Domplate)

// Register strings before the following template definition.
Firebug.registerStringBundle("chrome://panelsplitter/locale/panelsplitter.properties");

var {domplate, DIV} = Domplate;

MyPanel.prototype.MyTemplate = domplate(
{
    tag:
        DIV(
            DIV({"class": "topPane"},
                Locale.$STR("panelsplitter.panel.label1")
            ),
            DIV({"class": "myResizer"}),
            DIV({"class": "bottomPane"},
                Locale.$STR("panelsplitter.panel.label2")
            )
        ),

    render: function(parentNode)
    {
        this.tag.replace({}, parentNode);
    }
})

// ********************************************************************************************* //
// Registration

Firebug.registerPanel(MyPanel);
Firebug.registerStylesheet("chrome://panelsplitter/skin/panelsplitter.css");

return MyPanel;

// ********************************************************************************************* //
});
