'use strict';

window.utils = (function () {
  return {
    EVENT_TYPES: {
      CLICK: 'click',
      KEYDOWN: 'keydown',
      MOUSEDOWN: 'mousedown',
      MOUSEMOVE: 'mousemove',
      MOUSEUP: 'mouseup'
    },
    KEY_CODES: {
      ENTER: 13,
      ESC: 27
    },
    removeClass: function (elements, className) {
      for (var i = 0; i < elements.length; i++) {
        if (elements[i].classList.contains(className)) {
          elements[i].classList.remove(className);
        }
      }
    }
  };
})();
