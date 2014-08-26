/* See license.txt for terms of usage */

"use strict";

window.addEventListener("message", event => {
  console.log("myPanel.message; " + event.data, event);

  window.debugee = event.ports[0];
  window.chrome = event.ports[1];

  chrome.onmessage = onChromeMessage;
  debugee.onmessage = onDebugeeMessage;

  //var packet = {to: "root", type: "listTabs"};
  //sendDebugeeMessage(packet).then(event => onDebugeeMessage(event));
});

function sendChromeMessage(packet) {
  chrome.postMessage(packet);
}

function sendDebugeeMessage(packet) {
  return new Promise((resolve, reject) => {
    console.log("sendDebugeeMessage; packet: ", packet)
    debugee.postMessage(packet);
    debugee.onmessage = function(event) {
      resolve(event);
    }
  });
}

function onDebugeeMessage(event) {
  console.log("onDebugeeMessage", event);

  var parentNode = document.getElementById("content");
  var item = document.createElement("pre");
  item.textContent = JSON.stringify(event.data, 2, 2);
  parentNode.appendChild(item);
}

function onChromeMessage(event) {
  console.log("onChromeMessage", event);

  var parentNode = document.getElementById("content");
  var item = document.createElement("pre");
  item.textContent = JSON.stringify(event.data, 2, 2);
  parentNode.appendChild(item);
}
