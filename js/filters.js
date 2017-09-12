'use strict';

window.filters = (function () {
  var filtersContainer = document.querySelector('.tokyo__filters');
  var housingType = document.getElementById('housing_type');
  var housingPrice = document.getElementById('housing_price');
  var housingRoomNumber = document.getElementById('housing_room-number');
  var housingGuestsNumber = document.getElementById('housing_guests-number');
  var housingFeatures = document.querySelectorAll('.feature input');

  var filterByType = function (it, arr) {
    switch (housingType.value) {
      case 'any':
        return it;
      default:
        return arr.offer.type === housingType.value;
    }
  };
  var filterByPrice = function (it, arr) {
    switch (housingPrice.value) {
      case 'any':
        return it;
      case 'middle':
        return arr.offer.price >= 10000 && arr.offer.price <= 50000;
      case 'low':
        return arr.offer.price < 10000;
      case 'high':
        return arr.offer.price > 50000;
    }
  };
  var filterByRoomNumber = function (it, arr) {
    switch (housingRoomNumber.value) {
      case 'any':
        return it;
      default:
        return arr.offer.rooms === Number(housingType.value);
    }
  };
  var filterByGuestsNumber = function (it, arr) {
    switch (housingGuestsNumber.value) {
      case 'any':
        return it;
      default:
        return arr.offer.guests === Number(housingType.value);
    }
  };
  var filterF = [filterByType, filterByPrice, filterByRoomNumber, filterByGuestsNumber];

  return function (arr) {
    return filterF.reduce(function (initial, el) {
      return initial.filter(el);
    }, arr);
  };
})();
