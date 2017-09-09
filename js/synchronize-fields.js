'use strict';
(function () {
  var checkinTime = document.getElementById('timein');
  var checkoutTime = document.getElementById('timeout');
  var apartmentType = document.getElementById('type');
  var pricePerNight = document.getElementById('price');

  var syncValues = function (element, value) {
    element.value = value;
  };
  var syncValueWithMin = function (element, value) {
    element.value = value;
  };
  var synchronizeFields = function (input1, input2, arr1, arr2, callback) {
    input1.addEventListener('change', function () {
      var number = arr1.indexOf(input1.value);
      callback(input2, arr2[number]);
    });
  };
  window.synchronizeFields = synchronizeFields;
  window.synchronizeFields(checkinTime, checkoutTime, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);
  window.synchronizeFields(checkoutTime, checkinTime, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);
  window.synchronizeFields(apartmentType, pricePerNight, ['flat', 'bungalo', 'house', 'palace'], [1000, 0, 5000, 10000], syncValueWithMin);
})();

