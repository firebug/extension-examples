/* See license.txt for terms of usage */

"use strict";

const { Cu } = require("chrome");
const { Panel } = require("dev/panel");
const { Tool } = require("dev/toolbox");
const { Class } = require("sdk/core/heritage");
const { Trace, TraceError } = require("./trace.js");
const { MessagePort, MessageChannel } = require("sdk/messaging");
const { DebuggerClient } = Cu.import("resource://gre/modules/devtools/dbg-client.jsm", {});
const { MyActorClient } = require("./myActor.js");

const { defer } = require("sdk/core/promise");

const MyPanel = Class({
  extends: Panel,

  label: "My Panel",
  icon: "./icon-16.png",
  tooltip: "Example extension",
  url: "./myPanel.html",

  setup: function({debuggee}) {
    Trace.sysout("myPanel.setup", arguments);

    this.debuggee = debuggee;
  },

  dispose: function() {
    this.content.close();
    delete this.content;
    delete this.debuggee;
  },

  onReady: function() {
    Trace.sysout("myPanel.onReady;", this.debuggee);

    const { port1, port2 } = new MessageChannel();
    this.content = port1;

    // Listen for messages sent from the panel content.
    this.content.onmessage = this.onContentMessage.bind(this);

    // Start up channels
    this.content.start();
    this.debuggee.start();

    // Create debugger client
    let transport = this.debuggee.transport;

    transport.hooks = {
      onPacket: packet => Trace.sysout("RECEIVED " + packet, packet)
    };

    let client = this.client = new DebuggerClient(transport);
    client.connect((aType, aTraits) => {
      // Get list of tabs
      client.listTabs(response => {
        // Attach to the current tab
        let tabActor = response.tabs[response.selected];
        client.attachTab(tabActor, (response, tabClient) => {
          // Send attach packet
          let attach = { to: response.from.myActor, type: "attach" };
          client.request(attach).then(response => {
            // Send hello packet
            let hello = { to: response.from, type: "hello" };
            client.request(hello).then(response => {
              Trace.sysout("!!! " + response.msg, response);
            });
          });
        });
      });
    });

    // Pass channels to the panel content scope (frame).
    //this.postMessage("connect", [this.debuggee, port2]);
  },

  onContentMessage: function(event) {
    Trace.sysout("myPanel.onMessage; (from content)", event);
  },

  onLoad: function() {
    Trace.sysout("myPanel.onLoad;");
  }
});

const myTool = new Tool({
  panels: { myPanel: MyPanel }
});

exports.MyPanel = MyPanel;
