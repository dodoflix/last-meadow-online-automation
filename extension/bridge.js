// Last Meadow Online — Bridge (MAIN world)
// Listens for code from the ISOLATED-world loader and executes it in page context.
document.addEventListener('lmo-inject', function(e) {
  if (e.detail) {
    try { new Function(e.detail)(); }
    catch (err) { console.error('[LMO] Script error:', err); }
  }
}, { once: false });
