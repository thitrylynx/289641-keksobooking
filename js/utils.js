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
    },
    removeChild: function (value) {
      while (value.children.length !== 1) {
        value.removeChild(value.children[1]);
      }
    },
    translate: function (value) {
      switch (value) {
        case 'flat':
          return 'Квартира';
        case 'house':
          return 'Дом';
        case 'bungalo':
          return 'Бунгало';
      } return value;
    },
    compareRandom: function () {
      return Math.random() - 0.5;
    },
    debounce: function (value) {
      var DEBOUNCE_INT = 500; // 30 сек
      var lastTimeout = 0;
      return function () {
        if (lastTimeout) {
          clearTimeout(lastTimeout);
        }
        lastTimeout = setTimeout(value, DEBOUNCE_INT);
      };
    }
  };
})();
