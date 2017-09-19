'use strict';

window.Form = (function () {
  var PRICES = {
    MIN: 0,
    MAX: 1000000
  };
  var SYMBOLS = {
    MIN: 30,
    MAX: 100
  };
  var ROOMS = [
    '1',
    '2',
    '3',
    '100'
  ];
  var GUEST_COUNTS = [
    ['1'],
    ['1', '2'],
    ['1', '2', '3'],
    ['0']
  ];
  var CHECKIN_OR_CHECKOUT_TIME = [
    '12:00',
    '13:00',
    '14:00'
  ];
  var form = document.querySelector('.notice__form');
  var title = document.querySelector('#title');
  var price = document.querySelector('#price');
  var address = document.querySelector('#address');
  var type = document.querySelector('#type');
  var description = document.querySelector('#description');
  var capacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');
  var checkinTime = document.querySelector('#timein');
  var checkoutTime = document.querySelector('#timeout');

  var setDefaultSettings = function () {
    form.reset();
    title.value = '';
    type.value = 'flat';
    price.type = 'number';
    price.value = 1000;
    description.value = '';
    roomNumber.value = '1';
  };
  //
  // 1 комната — «для одного гостя»
  // 2 комнаты — «для 2-х или 1-го гостя»
  // 3 комнаты — «для 2-х, 1-го или 3-х гостей»
  // 100 комнат — «не для гостей»
  //
  var syncValues = function (element, value) {
    element.value = value;
  };
  var syncValueWithMin = function (element, value) {
    element.min = value;
    element.value = value;
  };
  var syncValueWithOptions = function (element, value) {
    var optionElements = [].slice.call(element.querySelectorAll('option'));
    optionElements.forEach(function (option) {
      var indexValue = value.indexOf(option.value);
      if (indexValue > -1) {
        option.disabled = false;
        option.selected = indexValue === 0;
      } else {
        option.disabled = true;
      }
    });
  };
  window.synchronizeFields(checkinTime, checkoutTime, CHECKIN_OR_CHECKOUT_TIME, CHECKIN_OR_CHECKOUT_TIME, syncValues);
  window.synchronizeFields(checkoutTime, checkinTime, CHECKIN_OR_CHECKOUT_TIME, CHECKIN_OR_CHECKOUT_TIME, syncValues);
  window.synchronizeFields(type, price, ['flat', 'bungalo', 'house'], [1000, 0, 10000], syncValueWithMin);
  window.synchronizeFields(roomNumber, capacity, ROOMS, GUEST_COUNTS, syncValueWithOptions);

  title.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < SYMBOLS.MIN) {
      target.setCustomValidity('Имя должно состоять минимум из 30-ти символов');
    } else if (target.value.length > SYMBOLS.MAX) {
      target.setCustomValidity('Имя должно иметь не больше 100 символов');
    } else {
      target.setCustomValidity('');
    }
  });
  address.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length === '') {
      target.setCustomValidity('Обязательное поле');
    } else {
      target.setCustomValidity('');
    }
  });
  price.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < 1) {
      target.setCustomValidity('Минимальное значение - 0');
    } else if (target.value > PRICES.MAX) {
      target.setCustomValidity('Максимальное значение — 1 000 000');
    } else {
      target.setCustomValidity('');
    }
  });

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.className = 'error-message';
    node.style = 'z-index: 110; position: fixed; margin: 0 auto; text-align: center; background-color: red; left: 0; right: 0; color: white; font-size: 20px;';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };
  var onSuccess = function () {
    setDefaultSettings();
    if (document.body.firstChild.className === 'error-message') {
      document.body.firstChild.remove();
    }
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.Backend.save(new FormData(form), onSuccess, errorHandler);
  });

  return {
    setAddress: function (value) {
      address.value = value;
    }
  };
})();
