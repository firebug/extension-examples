/* See license.txt for terms of usage */

FBL.ns(function() { with (FBL) {

var panelName = "HelloWorld";

// ********************************************************************************************* //
// Module

/**
 * Author: Jan Odvarko, www.janodvarko.cz
 */
Firebug.HelloWorldModel = extend(Firebug.Module,
{ 
    initialize: function(prefDomain, prefNames)
    {
        Firebug.Module.initialize.apply(this, arguments);

        FBTrace.sysout("helloworld; HelloWorldModel.initialize");
    },

    showPanel: function(browser, panel)
    {
        var isHwPanel = panel && panel.name == panelName;
        var hwButtons = Firebug.chrome.$("fbHelloWorldButtons");
        collapse(hwButtons, !isHwPanel);
    },

    onMyButton: function(context)
    {
        alert("Hello World!");
    },
});

// ********************************************************************************************* //
// Panel

function HelloWorldPanel() {}
HelloWorldPanel.prototype = extend(Firebug.Panel,
{ 
    name: panelName, 
    title: "Hello World!",

    initialize: function()
    {
        Firebug.Panel.initialize.apply(this, arguments);

        FBTrace.sysout("helloworld; HelloWorldPanel.initialize");
    },

    getOptionsMenuItems: function(context)
    {
        return [
            this.optionMenu("Option1", "helloworld.option1"),
            "-",
            this.optionMenu("Option2", "helloworld.option2")
        ];
    },

    optionMenu: function(label, option)
    {
        var value = Firebug.getPref(Firebug.prefDomain, option);
        return {
            label: label,
            nol10n: true,
            type: "checkbox",
            checked: value,
            command: bindFixed(Firebug.setPref, this, Firebug.prefDomain, option, !value)
        };
    }
});

// ********************************************************************************************* //
// Registration

Firebug.registerPanel(HelloWorldPanel);
Firebug.registerModule(Firebug.HelloWorldModel);

// ********************************************************************************************* //
}});
