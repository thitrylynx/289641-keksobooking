'use strict';
var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;


// ----DATA-----------------------------------------------------
(function () {
  var AVATAR_NUMBERS = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08'
  ];
  var TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var TYPES = [
    'flat',
    'house',
    'bungalo'
  ];
  var TIME = [
    '12:00',
    '13:00',
    '14:00'
  ];
  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  // функция случайной сортировки массива
  var compareRandom = function () {
    return Math.random() - 0.5;
  };

  // функция получения случайного числа на заданном промежутке
  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // функция получения случайного неповторяющегося значения из массива
  var getUniqueElement = function (array) {
    array.sort(compareRandom);
    return array.pop();
  };

  // функция получения случайной длины массива
  var getRandomArrayLength = function (array) {
    return array.slice(0, getRandomInt(0, array.length));
  };

  var getRandomTime = function (array) {
    return array[getRandomInt(0, array.length - 1)];
  };

  var getRandomType = function (array) {
    var typeName = array[getRandomInt(0, array.length - 1)];
    if (typeName === 'flat') {
      typeName = 'Квартира';
    } else if (typeName === 'house') {
      typeName = 'Дом';
    } else {
      typeName = 'Бунгало';
    }
    return typeName;
  };
  // функция создания массива случайных объявлений
  var getRandomDialogsArr = function (length) {
    var array = [];
    for (var j = 0; j < length; j++) {
      var LOCATION_X = getRandomInt(300, 900);
      var LOCATION_Y = getRandomInt(100, 500);
      array.push({
        author: {
          avatar: './img/avatars/user' + getUniqueElement(AVATAR_NUMBERS) + '.png'
        },
        offer: {
          title: getUniqueElement(TITLES),
          address: [LOCATION_X, LOCATION_Y].join(','),
          price: getRandomInt(1000, 1000000),
          type: getRandomType(TYPES),
          rooms: getRandomInt(1, 5),
          guests: getRandomInt(1, 10),
          checkin: getRandomTime(TIME),
          checkout: getRandomTime(TIME),
          features: getRandomArrayLength(FEATURES),
          description: '',
          photos: []
        },
        location: {
          x: LOCATION_X,
          y: LOCATION_Y
        }
      });
    }
    return array;
  };
  var OFFERS = getRandomDialogsArr(AVATAR_NUMBERS.length);
  window.data = OFFERS;
})();

// ------------PIN ---------------------------
(function () {
  var KEY_CODES = {
    ENTER: 13,
    ESC: 27
  };
  var EVENT_TYPES = {
    CLICK: 'click',
    KEYDOWN: 'keydown'
  };
  var fragmentPin = document.createDocumentFragment();
  // функция отрисовки маркеров
  var renderFragmentPinMap = function (objects) {
    for (var k = 0; k < window.data.length; k++) {
      var newElement = document.createElement('div');
      var imgElement = document.createElement('img');
      var offer = objects[k];

      newElement.classList.add('pin');
      newElement.style.left = (offer.location.x - PIN_WIDTH / 2) + 'px';
      newElement.style.top = (offer.location.y + PIN_HEIGHT) + 'px';
      imgElement.classList.add('rounded');
      imgElement.style.width = PIN_WIDTH + 'px';
      imgElement.style.height = PIN_HEIGHT + 'px';
      imgElement.setAttribute('src', offer.author.avatar);
      imgElement.setAttribute('tabindex', '0');
      fragmentPin.appendChild(newElement);
      newElement.appendChild(imgElement);
    }
    document.querySelector('.tokyo__pin-map').appendChild(fragmentPin);
  };

  // функция подсветки активного маркера при клике (enter)
  var pinActivate = function (evt) {
    if (evt.keyCode === KEY_CODES.ENTER || evt.type === EVENT_TYPES.CLICK) {
      renderOffer(evt);
    }
  };

  // функция закрытия объявления и удаления подсветки маркера
  var pinDeactivate = function (evt) {
    if (evt.keyCode === KEY_CODES.ESC || evt.type === EVENT_TYPES.CLICK) {
      offerPanel.classList.add('hidden');
      removeClass(pins, 'pin--active');
    }
  };
})();

// ----------------------END

// ----------------------CARD

// функция отрисовки объявлений
var offerPanelTemplate = document.getElementById('lodge-template').content;
var fragmentFeature = document.createDocumentFragment();
var fragmentPanel = document.createDocumentFragment();
var renderOfferPanel = function (offer) {
  var panelElement = offerPanelTemplate.cloneNode(true);
  var dialogImage = document.querySelector('.dialog__title > img');

  for (var l = 0; l < offer.offer.features.length; l++) {
    var feature = document.createElement('span');
    feature.className = 'feature__image feature__image--' + offer.offer.features[l];
    fragmentFeature.appendChild(feature);
  }

  panelElement.querySelector('.lodge__title').textContent = offer.offer.title;
  panelElement.querySelector('.lodge__address').textContent = offer.offer.address;
  panelElement.querySelector('.lodge__price').innerHTML = offer.offer.price + '&#x20bd;/ночь';
  panelElement.querySelector('.lodge__type').textContent = offer.offer.type;
  panelElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + offer.offer.guests + ' гостей в ' + offer.offer.rooms + ' комнатах';
  panelElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + offer.offer.checkin + ', ' + 'выезд до ' + offer.offer.checkout;
  panelElement.querySelector('.lodge__features').appendChild(fragmentFeature);
  panelElement.querySelector('.lodge__description').textContent = offer.offer.description;
  dialogImage.setAttribute('src', offer.author.avatar);
  return panelElement;
};

renderFragmentPinMap(window.data);

// --------------END

// ---------------------MAP-------------------
(function () {
  var EVENT_TYPES = {
    CLICK: 'click',
    KEYDOWN: 'keydown'
  };
  var offerPanel = document.getElementById('offer-dialog');
  var offerPanelClose = document.querySelector('.dialog__close');
  var pinMap = document.querySelector('.tokyo__pin-map');
  var pins = pinMap.querySelectorAll('.pin:not(:first-child)');
  // функция удаления класса
  var removeClass = function (elements, className) {
    elements.forEach(function (element) {
      if (element.classList.contains(className)) {
        element.classList.remove(className);
      }
    });
  };

  // функция добавления класса активного элемента при нажатии на маркер
  var renderOffer = function (evt) {
    var pinsArray = Array.prototype.slice.call(pins);
    removeClass(pins, 'pin--active');
    var target = evt.currentTarget;
    target.classList.add('pin--active');
    var activePinNumber = pinsArray.indexOf(target);
    offerPanel.classList.remove('hidden');
    openDialog(activePinNumber);
  };


  // функция открытия объявления
  var openDialog = function (activePinNumber) {
    offerPanel.appendChild(renderOfferPanel(window.data[activePinNumber]));
    offerPanel.replaceChild(fragmentPanel, offerPanel.children[1]);
  };


  // показать объяления
  for (var i = 0; i < pins.length; i++) {
    pins[i].addEventListener(EVENT_TYPES.CLICK, pinActivate);
    pins[i].addEventListener(EVENT_TYPES.KEYDOWN, pinActivate);
  }

  // скрыть объявления
  offerPanelClose.addEventListener(EVENT_TYPES.CLICK, pinDeactivate);
  document.body.addEventListener(EVENT_TYPES.KEYDOWN, pinDeactivate);

})();


// --------------------------END

// ---------------------FORM--------------------
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
  var TYPE = {
    FLAT: 'flat',
    HOUSE: 'house',
    BUNGALO: 'bungalo',
    PALACE: 'palace'
  };
  var form = document.querySelector('.notice__form');
  var title = document.getElementById('title');
  var price = document.getElementById('price');
  var address = document.getElementById('address');
  var timeIn = document.getElementById('timein');
  var timeOut = document.getElementById('timeout');
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
  var dynamicCorrectInputs = function (constant, variable) {
    constant.addEventListener('change', function () {
      variable.value = constant.value;
    });
  };
  var dynamicCorrectPrice = function () {
    type.addEventListener('change', function () {
      switch (type.value) {
        case TYPE.FLAT:
          price.value = 1000;
          return 'Квартира';
        case TYPE.HOUSE:
          price.value = 5000;
          return 'Дом';
        case TYPE.BUNGALO:
          price.value = 0;
          return 'Бунгало';
        case TYPE.PALACE:
          price.value = 10000;
          return 'Дворец';
        default:
          return '';
      }
    });
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

  dynamicCorrectInputs(timeIn, timeOut);
  dynamicCorrectInputs(timeOut, timeIn);
  dynamicCorrectPrice(type, price);
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
  setDefaultSettings();
})();

// ----------------------------END
