'use strict';

window.debounce = function (value) {
  var DEBOUNCE_INT = 500; // 30 сек
  var lastTimeout = 0;

  return function () {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(value, DEBOUNCE_INT);
  };
};
