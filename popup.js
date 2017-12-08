var isEnabled = window.localStorage.getItem("SPLUNK_INTERVAL_ENABLED");
var button = document.getElementById("toggle");
var toggleStatus = document.getElementById("toggleStatus");

if (isEnabled == null) {
  window.localStorage.setItem("SPLUNK_INTERVAL_ENABLED", 0);
  isEnabled = window.localStorage.getItem("SPLUNK_INTERVAL_ENABLED");
}

updateUi(isEnabled);

button.addEventListener("click", function(e) {
  var isEnabled = window.localStorage.getItem("SPLUNK_INTERVAL_ENABLED");
  if (isEnabled == 1) window.localStorage.setItem("SPLUNK_INTERVAL_ENABLED", 0);
  if (isEnabled == 0) window.localStorage.setItem("SPLUNK_INTERVAL_ENABLED", 1);
  isEnabled = window.localStorage.getItem("SPLUNK_INTERVAL_ENABLED");

  // https://developer.chrome.com/extensions/messaging
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { enabled: isEnabled }, function(
      response
    ) {
      console.log("response", response);
      if (response == "Thanks Mr. Extension") {
        updateUi(isEnabled);
      }
    });
  });
});

function updateUi(isEnabled) {
  if (isEnabled == 1) {
    // toggleStatus.innerText = "STATUS: Enabled";
    button.innerText = "DISABLE";
    button.className = "disable";
  } else if (isEnabled == 0) {
    // toggleStatus.innerText = "STATUS: Disabled";
    button.innerText = "ENABLE";
    button.className = "enable";
  }
}
