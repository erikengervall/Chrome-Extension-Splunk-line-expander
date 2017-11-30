var inProgress = false;

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

document.addEventListener("keydown", keyDownEvent, false);
