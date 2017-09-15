'use strict';

(function () {
  window.synchronizeFields = function (input1, input2, arr1, arr2, callback) {
    input1.addEventListener('change', function () {
      var number = arr1.indexOf(input1.value);
      callback(input2, arr2[number]);
    });
  };
})();
