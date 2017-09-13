'use strict';

window.debounce = (function () {
  var DEBOUNCE_INT = 300;
  var lastTimeout;
  return function (value) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(value, DEBOUNCE_INT);
  };
})();
