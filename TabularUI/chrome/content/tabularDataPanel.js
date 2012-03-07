/* See license.txt for terms of usage */

define([
    "firebug/lib/lib",
    "firebug/lib/trace",
    "firebug/chrome/tableRep",
],
function(FBL, FBTrace, TableRep) {

// ********************************************************************************************* //
// Panel Implementation

var TabularDataPanel = function TabularDataPanel() {};
TabularDataPanel.prototype = FBL.extend(Firebug.Panel,
{
    name: "tabularDataPanel",
    title: "Links",

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Initialization

    initialize: function()
    {
        Firebug.Panel.initialize.apply(this, arguments);
    },

    destroy: function(state)
    {
        Firebug.Panel.destroy.apply(this, arguments);
    },

    show: function()
    {
        FBTrace.sysout("tabularui; TabularDataPanel.show");

        var links = this.context.window.document.querySelectorAll("a");
        this.renderTable(links);
    },

    renderTable: function(object)
    {
        var obj = [
            {name: "John", age: "25"},
            {name: "Jack", age: "24"},
            {name: "Bob", age: "23"}
        ];

        var cols = [];
        cols.push({
            property: "name",
            label: "name",
            alphaValue: true
        });

        cols.push({
            property: "age",
            label: "Age",
            alphaValue: false
        });

        FirebugReps.Table.columns = cols;
        var object = {data: obj, columns: cols};
        FirebugReps.Table.tag.replace({object: object}, this.panelNode);
    }
});

// ********************************************************************************************* //

return TabularDataPanel;

// ********************************************************************************************* //
});
