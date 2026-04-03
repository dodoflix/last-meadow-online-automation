// Last Meadow Online — Extension Loader (ISOLATED world)
// Requests script from background service worker (bypasses CSP), passes to MAIN world bridge.
chrome.runtime.sendMessage({ type: 'lmo-fetch' }, function(res) {
  if (res && res.code) {
    document.dispatchEvent(new CustomEvent('lmo-inject', { detail: res.code }));
  } else {
    console.error('[LMO] Failed to load script from background worker.');
  }
});
