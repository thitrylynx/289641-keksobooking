'use strict';

(function () {
  window.synchronizeFields = function (input1, input2, array1, array2, callback) {
    input1.addEventListener('change', function () {
      var number = array1.indexOf(input1.value);
      callback(input2, array2[number]);
    });
  };
})();
