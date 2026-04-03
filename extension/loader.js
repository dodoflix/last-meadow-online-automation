// Last Meadow Online — Extension Loader
// Fetches and injects the latest script from GitHub releases.
(function() {
  var REPO = 'dodoflix/last-meadow-online-automation';
  var CACHE_KEY = 'lmo_script_cache';
  var CACHE_TTL = 3600000; // 1 hour

  function inject(code) {
    try { new Function(code)(); }
    catch (e) { console.error('[LMO] Script error:', e); }
  }

  function fetchLatest(callback) {
    fetch('https://api.github.com/repos/' + REPO + '/releases/latest')
      .then(function(r) { return r.ok ? r.json() : null; })
      .then(function(d) {
        if (!d || !d.assets) return callback(null);
        var asset = d.assets.find(function(a) { return a.name === 'console-script.min.js'; });
        if (!asset) return callback(null);
        return fetch(asset.browser_download_url).then(function(r) { return r.text(); });
      })
      .then(function(code) {
        if (code) {
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({
              ts: Date.now(), code: code
            }));
          } catch (e) {}
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
      // Background refresh for next load
      fetchLatest(function(code) {
        if (code) localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), code: code }));
      });
      return;
    }
  } catch (e) {}

  // No valid cache — fetch and inject
  fetchLatest(function(code) {
    if (code) inject(code);
    else console.error('[LMO] Failed to fetch script from GitHub releases.');
  });
})();
