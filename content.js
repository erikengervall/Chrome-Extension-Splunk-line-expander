var intervalId = null;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.enabled === undefined) return console.error("request undefined");
  storage.setItem(KEY, request.enabled);
  storage.getItem(KEY) == 1 ? startInterval() : stopInterval(intervalId);
  sendResponse("Thanks Mr. Extension");
});

function closeOverlay() {
  var overlays = document.getElementsByClassName("modalize-table-overlay");
  for (var i = 0; i < overlays.length; i++) {
    overlays[i].click();
  }
}

function clickButtons(className) {
  var done = true;

  var buttons = document.getElementsByClassName(className);
  for (var i = 0; i < buttons.length; i++) {
    var dataPath = buttons[i].getAttribute("data-path");
    if (dataPath && dataPath.startsWith("line")) {
      buttons[i].click();
      done = false;
    }
  }

  if (done || storage.getItem(KEY) == 0) {
    return closeOverlay();
  }

  setTimeout(function() {
    clickButtons(className);
  }, 50);
}

function startInterval() {
  clickButtons("jsexpands");
  if (intervalId) stopInterval(intervalId);
  intervalId = setInterval(function() {
    clickButtons("jsexpands");
  }, 750);
}

function stopInterval() {
  clearInterval(intervalId);
  intervalId = null;
}

if (storage.getItem(KEY) == 1) startInterval();
