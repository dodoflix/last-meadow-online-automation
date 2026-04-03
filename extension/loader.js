// Last Meadow Online — Extension Loader (ISOLATED world)
// Fetches latest script from GitHub (bypasses page CSP), passes to MAIN world bridge for execution.
(function() {
  var REPO = 'dodoflix/last-meadow-online-automation';
  var RAW_BASE = 'https://raw.githubusercontent.com/' + REPO;
  var CACHE_KEY = 'lmo_script_cache';
  var CACHE_TTL = 3600000; // 1 hour

  function inject(code) {
    // Dispatch to the MAIN-world bridge script via CustomEvent on document
    document.dispatchEvent(new CustomEvent('lmo-inject', { detail: code }));
  }

  function fetchLatest(callback) {
    fetch(RAW_BASE + '/main/src/content.js')
      .then(function(r) { return r.ok ? r.text() : null; })
      .then(function(code) {
        if (code) {
          try { localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), code: code })); } catch (e) {}
          callback(code);
        } else callback(null);
      })
      .catch(function() { callback(null); });
  }

  // Try cache first for instant load
  try {
    var cached = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (cached && cached.code && (Date.now() - cached.ts) < CACHE_TTL) {
      inject(cached.code);
      fetchLatest(function() {});
      return;
    }
  } catch (e) {}

  fetchLatest(function(code) {
    if (code) inject(code);
    else console.error('[LMO] Failed to fetch script. Check network errors.');
  });
})();
