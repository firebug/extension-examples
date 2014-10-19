/* See license.txt for terms of usage */

"use strict";

const { Cu } = require("chrome");
const { Panel } = require("dev/panel");
const { Tool } = require("dev/toolbox");
const { Class } = require("sdk/core/heritage");
const { Trace } = require("./trace.js");
const { DebuggerClient } = Cu.import("resource://gre/modules/devtools/dbg-client.jsm", {});
const { defer } = require("sdk/core/promise");
const { BulkActorFront } = require("./bulkActor.js");
const { viewFor } = require("sdk/view/core");

const { gDevTools } = Cu.import("resource:///modules/devtools/gDevTools.jsm", {});
const { devtools } = Cu.import("resource://gre/modules/devtools/Loader.jsm", {});

const MyPanel = Class({
  extends: Panel,

  label: "My Panel",
  icon: "./icon-16.png",
  tooltip: "Example extension",
  url: "./myPanel.html",

  setup: function(options) {
    Trace.sysout("myPanel.setup", options);

    let frame = viewFor(this);
    let parentWin = frame.ownerDocument.defaultView;

    this.toolbox = getToolbox(parentWin);
  },

  dispose: function() {
  },

  onReady: function() {
    Trace.sysout("myPanel.onReady;");

    // Attach to our custom bulk actor {@BulkActor}.
    this.attach();
  },

  attach: function() {
    let target = this.toolbox.target;
    target.activeTab.attachThread({}, (response, threadClient) => {
      Trace.sysout("myPanel.attach; threadClient", arguments);

      let client = threadClient.client;
      client.listTabs(response => {
        Trace.sysout("myPanel.attach; tabs", response);
        let bulkActor = BulkActorFront(client, response);

        bulkActor.attach().then(() => {
          Trace.sysout("myPanel.attach; bulk actor attached");

          // Call simple method
          /*bulkActor.hello().then(response => {
          Trace.sysout("myPanel.attach; (from myActor): " +
            response.msg, response);
          });*/

          // Send bulk data
          bulkActor.sendData("some data");
        });
      });
    });
  },

  onLoad: function() {
    Trace.sysout("myPanel.onLoad;");
  }
});

function getToolbox(win) {
  let tab = getCurrentTab(win);
  if (tab) {
    let target = devtools.TargetFactory.forTab(tab);
    return gDevTools.getToolbox(target);
  }
}

function getCurrentTab(win) {
  if (win) {
    let browserDoc = win.top.document;
    let browser = browserDoc.getElementById("content");
    return browser.selectedTab;
  }

  // xxxHonza: do we really want this fall-back?
  let browser = getMostRecentBrowserWindow();
  if (browser)
    return browser.gBrowser.mCurrentTab;
}

const myTool = new Tool({
  panels: { myPanel: MyPanel }
});

exports.MyPanel = MyPanel;
