'use strict';

(function () {
  window.utils = {
    removeClass: function (elements, className) {
      elements.forEach(function (element) {
        if (element.classList.contains(className)) {
          element.classList.remove(className);
        }
      });
    }
  };
})();
