// Runs in <head>, before the first paint, so a visitor who chose a theme never sees the other one
// flash. "light" or "dark" is applied as data-theme; nothing stored (or "auto") leaves it off and the
// system decides (site.css). It also marks that scripts run, which shows the theme button.
try {
  var choice = localStorage.getItem('quantod-theme');
  if (choice === 'light' || choice === 'dark') document.documentElement.setAttribute('data-theme', choice);
} catch (e) { /* storage refused: the system decides */ }
document.documentElement.setAttribute('data-js', '');
