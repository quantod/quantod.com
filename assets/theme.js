// The theme button: light → dark → system, one click each. theme-init.js applied the stored choice
// before the page was drawn; this keeps the button, data-theme and storage in step, across tabs too.
(function () {
  var KEY = 'quantod-theme';
  var ORDER = ['light', 'dark', 'auto'];
  var LABEL = { light: 'Light', dark: 'Dark', auto: 'System' };
  var root = document.documentElement;
  function read() {
    try { var v = localStorage.getItem(KEY); return v === 'light' || v === 'dark' ? v : 'auto'; }
    catch (e) { return 'auto'; }
  }
  var BAR = { light: '#FFFFFF', dark: '#0C1310' };
  function apply(choice) {
    if (choice === 'auto') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', choice);
    // The browser bar: the chosen theme's colour on both theme-color tags, or back to the system's.
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (m) {
      var media = m.getAttribute('media') || '';
      m.setAttribute('content', choice === 'auto' ? (media.indexOf('dark') >= 0 ? BAR.dark : BAR.light) : BAR[choice]);
    });
    document.querySelectorAll('[data-theme-button]').forEach(function (b) {
      b.setAttribute('data-choice', choice);
      b.title = 'Theme: ' + LABEL[choice];
      b.setAttribute('aria-label', 'Theme: ' + LABEL[choice] + ' (change)');
    });
  }
  var current = read();
  apply(current);
  document.querySelectorAll('[data-theme-button]').forEach(function (b) {
    b.addEventListener('click', function () {
      current = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];
      try { localStorage.setItem(KEY, current); } catch (e) { /* applied, not remembered */ }
      apply(current);
    });
  });
  window.addEventListener('storage', function (e) {
    if (e.key === KEY || e.key === null) { current = read(); apply(current); }
  });
})();
