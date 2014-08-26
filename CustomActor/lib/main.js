/* See license.txt for terms of usage */

"use strict";

var self = require("sdk/self");

const { Cu, Ci } = require("chrome");
const { Trace, TraceError } = require("./trace.js");
const { MyPanel } = require("./myPanel.js");
const { DebuggerServer } = Cu.import("resource://gre/modules/devtools/dbg-server.jsm", {});

function main(options, callbacks) {
  Trace.sysout("main.js;", options);

  DebuggerServer.registerModule(self.data.url("../lib/myActor.js"));
}

function onUnload(reason) {
  Trace.sysout("main.onUnload; " + reason);
}

exports.main = main;
exports.onUnload = onUnload;
