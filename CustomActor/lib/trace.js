/* See license.txt for terms of usage */
/* jshint esnext: true */
/* global require: true, exports: true, Services: true, dump: true */

"use strict";

const { Cu } = require("chrome");

var FBTrace = {
  sysout: function(msg, object) {
    console.log(msg, object);
  }
};

try {
  // Use Tracing Console extension for logging if available.
  var scope = {};
  Cu["import"]("resource://fbtrace/firebug-trace-service.js", scope);
  FBTrace = scope.traceConsoleService.getTracer("extensions.firebug");
}
catch(err) {
}

exports.Trace = FBTrace;
exports.TraceError = FBTrace;
