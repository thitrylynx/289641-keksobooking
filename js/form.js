'use strict';

(function () {
  var PRICES = {
    MIN: 0,
    MAX: 1000000
  };
  var SYMBOLS = {
    MIN: 30,
    MAX: 100
  };
  var ROOMS = {
    ONE: '1',
    TWO: '2',
    THREE: '3',
    HUNGRED: '100'
  };
  var GUESTS = {
    ZERO: '0',
    ONE: '1',
    TWO: '2',
    THREE: '3'
  };
  var form = document.querySelector('.notice__form');
  var title = document.getElementById('title');
  var price = document.getElementById('price');
  var address = document.getElementById('address');
  var type = document.getElementById('type');
  var description = document.getElementById('description');
  var capacity = document.getElementById('capacity');
  var roomNumber = document.getElementById('room_number');
  var setDefaultSettings = function () {
    form.reset();
    title.value = '';
    address.value = '';
    type.value = 'flat';
    price.type = 'number';
    price.value = 1000;
    description.value = '';
    roomNumber.value = '1';
  };
  var dynamicCorrectRooms = function (element1, element2) {
    element1.addEventListener('change', function () {
      if (element1.value === GUESTS.ONE) {
        element2.value = ROOMS.ONE;
      } else if (element1.value === GUESTS.ONE || element1.value === GUESTS.TWO) {
        element2.value = ROOMS.TWO;
      } else if (element1.value === GUESTS.ONE || element1.value === GUESTS.TWO || element1.value === GUESTS.THREE) {
        element2.value = ROOMS.THREE;
      } else if (element1.value === GUESTS.ZERO) {
        element2.value = ROOMS.HUNGRED;
      }
    });
  };
  var dynamicCorrectCapacity = function (element1, element2) {
    element1.addEventListener('change', function () {
      if (element1.value === ROOMS.ONE || element1.value === ROOMS.TWO || element1.value === ROOMS.THREE) {
        element2.value = GUESTS.ONE;
      } else if (element1.value === ROOMS.TWO || element1.value === ROOMS.THREE) {
        element2.value = GUESTS.TWO;
      } else if (element1.value === ROOMS.THREE) {
        element2.value = GUESTS.THREE;
      } else if (element1.value === ROOMS.HUNGRED) {
        element2.value = GUESTS.ZERO;
      }
    });
  };
  dynamicCorrectCapacity(roomNumber, capacity);
  dynamicCorrectRooms(capacity, roomNumber);
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
    if (target.value.length < 1) {
      target.setCustomValidity('Обязательное поле');
      address.style.borderColor = 'red';
    } else {
      target.setCustomValidity('');
      address.style.borderColor = '';
    }
  });

  price.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < 1) {
      target.setCustomValidity('Минимальное значение - 0');
      price.style.borderColor = 'red';
    } else if (target.value > PRICES.MAX) {
      target.setCustomValidity('Максимальное значение — 1 000 000');
      price.style.borderColor = 'red';
    } else {
      target.setCustomValidity('');
      price.style.borderColor = '';
    }
  });
  var onSuccess = function () {
    setDefaultSettings();
  };
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 110; position: fixed; margin: 0 auto; text-align: center; background-color: red; left: 0; right: 0; color: white; font-size: 20px;';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), onSuccess, errorHandler);
  });
})();
