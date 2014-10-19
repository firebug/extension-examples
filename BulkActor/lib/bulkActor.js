/* See license.txt for terms of usage */

"use strict";

const { Cc, Ci, Cu } = require("chrome");
const { Trace } = require("./trace.js");
const { devtools } = Cu.import("resource://gre/modules/devtools/Loader.jsm", {});
const { ToolSidebar } = devtools["require"]("devtools/framework/sidebar");

let protocol = devtools["require"]("devtools/server/protocol");
let { method, RetVal, ActorClass, Actor, Front, FrontClass } = protocol;

const { reportException } = devtools["require"]("devtools/toolkit/DevToolsUtils");

/**
 * A method decorator that ensures the actor is in the expected state before
 * proceeding. If the actor is not in the expected state, the decorated method
 * returns a rejected promise.
 *
 * @param String expectedState
 *        The expected state.
 *
 * @param Function method
 *        The actor method to proceed with when the actor is in the expected
 *        state.
 *
 * @returns Function
 *          The decorated method.
 */
function expectState(expectedState, method) {
  return function(...args) {
    if (this.state !== expectedState) {
      const msg = "Wrong State: Expected '" + expectedState + "', but current "
                + "state is '" + this.state + "'";
      return Promise.reject(new Error(msg));
    }

    return method.apply(this, args);
  };
}

/**
 * TODO: description
 */
let BulkActor = ActorClass({
  typeName: "BulkActor",

  initialize: function(conn, parent) {
    Actor.prototype.initialize.call(this, conn);

    Trace.sysout("bulkActor.initialize;", arguments);

    this.state = "detached";
  },

  destroy: function() {
    Trace.sysout("bulkActor.destroy;", arguments);

    if (this.state === "attached") {
      this.detach();
    }

    Actor.prototype.destroy.call(this);
  },

  /**
   * Attach to this actor.
   */
  attach: method(expectState("detached", function() {
    Trace.sysout("bulkActor.attach;", arguments);

    this.state = "attached";
  }), {
    request: {},
    response: {
      type: "attached"
    }
  }),

  /**
   * Detach from this actor.
   */
  detach: method(expectState("attached", function() {
    Trace.sysout("bulkActor.detach;", arguments);

    this.state = "detached";
  }), {
    request: {},
    response: {
      type: "detached"
    }
  }),

  /**
   * A test method.
   *
   * @returns object
   */
  hello: method(function() {
    Trace.sysout("bulkActor.hello;", arguments);

    let result = {
      msg: "Hello from the backend!"
    };

    return result;
  }, {
    request: {},
    response: RetVal("json"),
  }),

  onData: method(expectState("attached", function(packet, conn) {
    Trace.sysout("bulkActor.onData;", arguments);

    // xxxHonza: how to get the data from the stream?
    //copyTo(output).then(() => {
    //});

    let result = {
      msg: "Bulk data received!"
    };

    return result;
  }), {
    request: {},
    response: RetVal("json"),
  }),
});

exports.BulkActor = BulkActor;

exports.BulkActorFront = FrontClass(BulkActor, {
  initialize: function(client, form) {
    Front.prototype.initialize.call(this, client, form);

    Trace.sysout("bulkActorFront.initialize;", arguments);

    this.client = client;
    this.actorID = form.bulkActor;
    this.manage(this);
  },

  sendData: function(data) {
    Trace.sysout("bulkActorFront.sendData; " + this.actorID, data);

    let request = this.client.startBulkRequest({
      actor: this.actorID,
      type: "onData",
      length: data.length
    });

    request.on("bulk-send-ready", ({copyFrom}) => {
      Trace.sysout("bulkActorFront.sendData; bulk-send-ready");

      let input = Cc["@mozilla.org/io/string-input-stream;1"].createInstance(
        Ci.nsIStringInputStream);
      input.data = data;

      copyFrom(input).then(() => {
        input.close();
        Trace.sysout("bulkActorFront.sendData; sent!", arguments);
      });
    });

    request.on("json-reply", () => {
      Trace.sysout("bulkActorFront.sendData; json-reply", arguments);
    })
  },
});
