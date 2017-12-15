var toggleButton = document.getElementById("toggle");

toggleButton.addEventListener("click", function(e) {
  storage.getItem(KEY) == 1 ? storage.setItem(KEY, 0) : storage.setItem(KEY, 1);

  // https://developer.chrome.com/extensions/messaging
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {
        enabled: storage.getItem(KEY)
      },
      function(response) {
        if (response == "Thanks Mr. Extension") updateUi();
      }
    );
  });
});

function updateUi() {
  if (storage.getItem(KEY) == 1) {
    toggleButton.innerText = "DISABLE";
    toggleButton.className = "disable";
  } else {
    toggleButton.innerText = "ENABLE";
    toggleButton.className = "enable";
  }
}

updateUi();
