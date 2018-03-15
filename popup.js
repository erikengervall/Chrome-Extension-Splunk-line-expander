// https://developer.chrome.com/extensions/messaging

function sendDataToClientBrowser(data) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { data }, function(response) {
      if (response == "Thanks Mr. Extension") updateUi();
    });
  });
}

var depthInput = document.getElementById("expand-line-depth");
depthInput.addEventListener("input", function(e) {
  var newDepth = Number(e.target.value);
  if (isNaN(newDepth)) {
    console.error("newDepth input ain't a number");
  } else {
    var data = getData();
    var newData = { ...data, depth: newDepth };
    setData(newData);

    sendDataToClientBrowser(newData);
  }
});

var toggleButton = document.getElementById("toggle");
toggleButton.addEventListener("click", function(e) {
  var data = getData();
  var newData = { ...data, enabled: !data.enabled };
  setData(newData);

  sendDataToClientBrowser(newData);
});

function updateUi() {
  var data = getData();
  if (data.enabled) {
    toggleButton.innerText = "DISABLE";
    toggleButton.className = "disable";
  } else {
    toggleButton.innerText = "ENABLE";
    toggleButton.className = "enable";
  }
  depthInput.value = getData().depth;
}

updateUi();
