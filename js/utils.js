'use strict';

(function () {
  // skrin + data вынеси 56
  window.utils = {
    removeClass: function (elements, className) {
      for (var i = 0; i < elements.length; i++) {
        if (elements[i].classList.contains(className)) {
          elements[i].classList.remove(className);
        }
      }
    }
  };
})();
