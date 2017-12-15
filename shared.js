var KEY_PREFIX = "SPLUNK_LINE_EXPANDER_ENABLED";
var VERSION = chrome.runtime.getManifest().version;
var KEY = KEY_PREFIX + "_" + VERSION;
var storage = window.localStorage;

function clearOldKeys() {
  Object.keys(localStorage).map(key => {
    if (key.indexOf(KEY_PREFIX) !== -1 && key.indexOf(VERSION) === -1)
      localStorage.removeItem(key);
  });
}

function setDefaultKey() {
  if (window.localStorage.getItem(KEY) === null)
    window.localStorage.setItem(KEY, 1);
}

clearOldKeys();
setDefaultKey();
