var KEY_PREFIX = "SPLUNK_LINE_EXPANDER";
var VERSION = chrome.runtime.getManifest().version;
var KEY = KEY_PREFIX + "_" + VERSION;
var storage = window.localStorage;

function setData(dataObject) {
  storage.setItem(KEY, JSON.stringify(dataObject));
  return dataObject;
}

function getData() {
  return JSON.parse(storage.getItem(KEY));
}

function clearOldData() {
  Object.keys(storage).map(key => {
    if (key.indexOf(KEY_PREFIX) !== -1 && key.indexOf(VERSION) === -1)
      storage.removeItem(key);
  });
}

function setDefaultData() {
  var defaultData = { enabled: true, depth: -1 };

  var data = getData();
  if (!data) setData(defaultData);
}

clearOldData();
setDefaultData();
