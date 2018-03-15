var intervalId = null;
var timeoutId = null;
var OVERLAY_CLASS_NAME = "modalize-table-overlay";

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  var data = request.data;
  if (request.data === undefined)
    return console.error("request.data undefined");

  setData(data);
  data.enabled ? startInterval(data.depth) : stopInterval(intervalId);
  sendResponse("Thanks Mr. Extension");
});

function closeOverlay() {
  var overlays = document.getElementsByClassName(OVERLAY_CLASS_NAME);
  for (var i = 0; i < overlays.length; i++) {
    overlays[i].click();
  }
}

function clickButtons(depth) {
  if (depth < 0) depth = 10;
  for (var i = 1; i <= depth; i++) {
    var expandButtons = document.querySelectorAll(
      `.key.level-${i} > .jsexpands[data-path^="line"]`
    );
    for (var j = 0; j < expandButtons.length; j++) {
      expandButtons[j].click();
    }
  }

  var collapseButtons = document.querySelectorAll(
    `.key.level-${depth + 1} > .jscollapse[data-path^="line"]`
  );
  for (var j = 0; j < collapseButtons.length; j++) {
    collapseButtons[j].click();
  }

  closeOverlay();
}

function startInterval(depth) {
  if (intervalId) stopInterval(intervalId);
  intervalId = setInterval(function() {
    clickButtons(depth);
  }, 100);
}

function stopInterval() {
  clearInterval(intervalId);
  clearTimeout(timeoutId);
  intervalId = null;
  timeoutId = null;
}

var data = getData();
if (data.enabled) startInterval(data.depth);
