'use strict';

window.filters = (function () {
  var housingType = document.querySelector('#housing_type');
  var housingPrice = document.querySelector('#housing_price');
  var housingRoomNumber = document.querySelector('#housing_room-number');
  var housingGuestsNumber = document.querySelector('#housing_guests-number');

  var filterByType = function (filter, itemValue) {
    switch (filter) {
      case 'any':
        return true;
      case itemValue:
        return true;
    } return false;
  };
  var filterByPrice = function (filter, itemValue) {
    switch (filter) {
      case 'middle':
        return (itemValue >= 10000) && (itemValue < 50000);
      case 'low':
        return itemValue < 10000;
      case 'high':
        return itemValue >= 50000;
    } return true;
  };
  var filterByRoomNumber = function (filter, itemValue) {
    switch (filter) {
      case '1':
        return itemValue === 1;
      case '2':
        return itemValue === 2;
      case '3':
        return itemValue === 3;
    } return true;
  };
  var filterByGuestsNumber = function (filter, itemValue) {
    switch (filter) {
      case '1':
        return itemValue === 1;
      case '2':
        return itemValue === 2;
    } return true;
  };
  var filterByFeatures = function (itemValues) {
    var housingFeatures = document.querySelectorAll('.feature input[type="checkbox"]:checked');
    var featuresActive = Array.prototype.map.call(housingFeatures, function (item) {
      return item.value;
    });
    return featuresActive.every(function (item) {
      return itemValues.indexOf(item) !== -1;
    });
  };

  return function () {
    return window.pinsList.filter(function (item) {
      if (!filterByType(housingType.value, item.offer.type)) {
        return false;
      }
      if (!filterByPrice(housingPrice.value, item.offer.price)) {
        return false;
      }
      if (!filterByRoomNumber(housingRoomNumber.value, item.offer.rooms)) {
        return false;
      }
      if (!filterByGuestsNumber(housingGuestsNumber.value, item.offer.guests)) {
        return false;
      }
      if (!filterByFeatures(item.offer.features)) {
        return false;
      }
      return true;
    });
  };
})();
