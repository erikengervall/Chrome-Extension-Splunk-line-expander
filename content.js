var inProgress = false;
var intervalId = null;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.enabled === undefined) return;
  window.localStorage.setItem("SPLUNK_INTERVAL_ENABLED", request.enabled);
  request.enabled == 1 ? tryInitInterval() : clearInterval(intervalId);
  sendResponse("Thanks Mr. Extension");
});

function closeOverlay() {
  var overlays = document.getElementsByClassName("modalize-table-overlay");
  for (var i = 0; i < overlays.length; i++) {
    overlays[i].click();
  }
}

function clickButtons(className) {
  var buttons = document.getElementsByClassName(className);
  var hadItemWithLine = false;
  for (var i = 0; i < buttons.length; i++) {
    var dataPath = buttons[i].getAttribute("data-path");
    if (dataPath && dataPath.startsWith("line")) {
      buttons[i].click();
      hadItemWithLine = true;
    }
  }
  if (!hadItemWithLine) {
    closeOverlay();
    inProgress = false;
    return console.log("Splunk line-expander done");
  }
  setTimeout(function() {
    clickButtons(className);
  }, 50);
}

function tryInitInterval() {
  if (window.localStorage.getItem("SPLUNK_INTERVAL_ENABLED") == 1) {
    clickButtons("jsexpands");
    intervalId = setInterval(function() {
      clickButtons("jsexpands");
    }, 1000);
  }
}

if (window.localStorage.getItem("SPLUNK_INTERVAL_ENABLED") === null) {
  window.localStorage.setItem("SPLUNK_INTERVAL_ENABLED", 1); // set default value
}

tryInitInterval();
