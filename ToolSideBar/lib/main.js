/* See license.txt for terms of usage */

"use strict";

const { Cu, Ci } = require("chrome");
const { gDevTools } = Cu.import("resource:///modules/devtools/gDevTools.jsm", {});
const { loadSheet } = require("sdk/stylesheet/utils");

const XUL_NS = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";

var self = require("sdk/self");
var sidePanelUrl = "chrome://toolsidebar/content/side-panel.xhtml";

function main(options, callbacks) {
  gDevTools.on("webconsole-ready", onWebConsoleReady);
  gDevTools.on("inspector-ready", onInspectorReady);
}

function onUnload(reason) {
  gDevTools.off("webconsole-ready", onWebConsoleReady);
  gDevTools.off("inspector-ready", onInspectorReady);
}

function onWebConsoleReady(eventId, toolbox, panel) {
  let frameWin = panel._frameWindow;
  let url = self.data.url("webconsole.css");
  loadSheet(frameWin, url, "author");

  let jsterm = panel.hud.jsterm;

  if (!jsterm.sidebar)
    jsterm._createSidebar();

  let doc = frameWin.document;
  let toolbar = doc.querySelector(".hud-console-filter-toolbar");
  let group = doc.querySelector(".devtools-toolbarbutton-group");

  // Create button for adding a new side panel.
  let button = doc.createElementNS(XUL_NS, "toolbarbutton");
  button.className = "devtools-toolbarbutton";
  button.setAttribute("label", "Add");
  button.addEventListener("command", () => {
    let tabId = "mySidePanel-" + Math.random().toString().substr(2);

    // BUG: the last argument (true) is intended to automatically
    // select the new tab. But if the side panel is added while
    // the entire side bar is hidden, it isn't possible to select
    // the tab since the select="true" attribute is never set
    // It looks like the tab binding's _selected method is never
    // executed. 
    jsterm.sidebar.addTab(tabId, sidePanelUrl, true);
  });

  toolbar.insertBefore(button, group);

  // Create button for removing the selected side panel.
  button = doc.createElementNS(XUL_NS, "toolbarbutton");
  button.className = "devtools-toolbarbutton";
  button.setAttribute("label", "Remove");
  button.addEventListener("command", () => {
    let currTab = jsterm.sidebar.getCurrentTabID();
    jsterm.sidebar.removeTab(currTab);
  });

  toolbar.insertBefore(button, group);

  // Create button for showing the side bar.
  button = doc.createElementNS(XUL_NS, "toolbarbutton");
  button.className = "devtools-toolbarbutton";
  button.setAttribute("label", "Show");
  button.addEventListener("command", () => {
    jsterm.sidebar.show();
  });

  toolbar.insertBefore(button, group);

  // Create button for hiding the side bar.
  button = doc.createElementNS(XUL_NS, "toolbarbutton");
  button.className = "devtools-toolbarbutton";
  button.setAttribute("label", "Hide");
  button.addEventListener("command", () => {
    jsterm.sidebar.hide();
  });

  toolbar.insertBefore(button, group);
}

function onInspectorReady(eventId, toolbox, panel) {
  let sidebar = panel.sidebar;
  sidebar.addTab("mySidePanel", sidePanelUrl, true);
}

exports.main = main;
exports.onUnload = onUnload;
