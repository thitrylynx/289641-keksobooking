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
    address.value = '';
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
  var getRoomsByGuest = function (guest, room) {
    if (guest === GUESTS.ONE && room === ROOMS.HUNGRED) {
      return ROOMS.ONE;
    }
    if (guest === GUESTS.TWO && room !== ROOMS.TWO && room !== ROOMS.THREE) {
      return ROOMS.TWO;
    }
    if (guest === GUESTS.THREE) {
      return ROOMS.THREE;
    }
    if (guest === GUESTS.ZERO) {
      return ROOMS.HUNGRED;
    }
    return room;
  };
  var dynamicCorrectRooms = function (guestEl, roomEl) {
    guestEl.addEventListener('change', function () {
      roomEl.value = getRoomsByGuest(guestEl.value, roomEl.value);
    });
  };
  var getGuestByRooms = function (room, guest) {
    if (room === ROOMS.ONE && guest !== GUESTS.ONE) {
      return GUESTS.ONE;
    }
    if (room === ROOMS.TWO && guest !== GUESTS.ONE && guest !== GUESTS.TWO) {
      return GUESTS.TWO;
    }
    if (room === ROOMS.THREE && guest === GUESTS.ZERO) {
      return GUESTS.THREE;
    }
    if (room === ROOMS.HUNGRED) {
      return GUESTS.ZERO;
    }
    return guest;
  };
  var dynamicCorrectGuests = function (roomEl, guestEl) {
    roomEl.addEventListener('change', function () {
      guestEl.value = getGuestByRooms(roomEl.value, guestEl.value);
    });
  };
  var syncValues = function (element, value) {
    element.value = value;
  };
  var syncValueWithMin = function (element, value) {
    element.min = value;
    element.value = value;
  };
  dynamicCorrectRooms(capacity, roomNumber);
  dynamicCorrectGuests(roomNumber, capacity);
  window.synchronizeFields(checkinTime, checkoutTime, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);
  window.synchronizeFields(checkoutTime, checkinTime, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);
  window.synchronizeFields(type, price, ['flat', 'bungalo', 'house'], [1000, 0, 10000], syncValueWithMin);

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
    setAddress: function (val) {
      address.value = val;
    }
  };
})();
