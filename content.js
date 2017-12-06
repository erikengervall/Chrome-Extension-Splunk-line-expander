chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(
    sender.tab
      ? "from a content script. taburl =  " + sender.tab.url
      : "from the extension. enabled = " + request.enabled
  );

  if (request.enabled !== undefined) {
    window.localStorage.setItem("SPLUNK_INTERVAL_ENABLED", request.enabled);
    sendResponse("OK");
    if (request.enabled == 1) {
      tryInitInterval();
    } else if (request.enabled == 0) {
      clearInterval(intervalId);
    }
  }
});

var inProgress = false;
var intervalId = null;

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
    inProgress = false;
    closeOverlay();
    return console.log("Splunk line-expander done");
  }
  setTimeout(function() {
    clickButtons(className);
  }, 50);
}

function keyDownEvent(e) {
  if (inProgress) {
    console.log("Splunk line-expander is currently in progress...");
    return;
  }
  if (e.keyCode === 37) {
    inProgress = true;
    clickButtons("jscollapse");
  }

  if (e.keyCode === 39) {
    inProgress = true;
    clickButtons("jsexpands");
  }
}

function tryInitInterval() {
  if (window.localStorage.getItem("SPLUNK_INTERVAL_ENABLED") == 1) {
    intervalId = setInterval(function() {
      clickButtons("jsexpands");
    }, 1000);
  }
}

document.addEventListener("keydown", keyDownEvent, false);

if (window.localStorage.getItem("SPLUNK_INTERVAL_ENABLED") === null) {
  window.localStorage.setItem("SPLUNK_INTERVAL_ENABLED", 1); // set default value
}

tryInitInterval();
