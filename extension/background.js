// Last Meadow Online — Background Service Worker
// Fetches script from GitHub, free from page CSP restrictions.
var REPO = 'dodoflix/last-meadow-online-automation';
var RAW_URL = 'https://raw.githubusercontent.com/' + REPO + '/main/src/content.js';
var CACHE_KEY = 'lmo_script_cache';
var CACHE_TTL = 3600000; // 1 hour

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.type !== 'lmo-fetch') return;

  chrome.storage.local.get(CACHE_KEY, function(store) {
    var cached = store[CACHE_KEY];
    if (cached && cached.code && (Date.now() - cached.ts) < CACHE_TTL) {
      sendResponse({ code: cached.code });
      // Background refresh for next load
      fetch(RAW_URL).then(function(r) { return r.ok ? r.text() : null; }).then(function(code) {
        if (code) chrome.storage.local.set({ [CACHE_KEY]: { ts: Date.now(), code: code } });
      }).catch(function() {});
      return;
    }

    fetch(RAW_URL)
      .then(function(r) { return r.ok ? r.text() : null; })
      .then(function(code) {
        if (code) {
          chrome.storage.local.set({ [CACHE_KEY]: { ts: Date.now(), code: code } });
          sendResponse({ code: code });
        } else {
          sendResponse({ code: null });
        }
      })
      .catch(function() { sendResponse({ code: null }); });
  });

  return true; // keep sendResponse channel open for async
});
