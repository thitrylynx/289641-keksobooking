'use strict';


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
var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;

var KEY_CODES = {
  ENTER: 13,
  ESC: 27
};
var EVENT_TYPES = {
  CLICK: 'click',
  KEYDOWN: 'keydown'
};

var fragmentPin = document.createDocumentFragment();
var offerPanelTemplate = document.getElementById('lodge-template').content;
var fragmentFeature = document.createDocumentFragment();
var fragmentPanel = document.createDocumentFragment();

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

// функция отрисовки маркеров
var renderFragmentPinMap = function (objects) {
  for (var k = 0; k < OFFERS.length; k++) {
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

// функция отрисовки объявлений
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

renderFragmentPinMap(OFFERS);

// ЗАДАНИЕ #11

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

// функция подсветки активного маркера при клике (enter)
var pinActivate = function (evt) {
  if (evt.keyCode === KEY_CODES.ENTER || evt.type === EVENT_TYPES.CLICK) {
    renderOffer(evt);
  }
};

// функция открытия объявления
var openDialog = function (activePinNumber) {
  offerPanel.appendChild(renderOfferPanel(OFFERS[activePinNumber]));
  offerPanel.replaceChild(fragmentPanel, offerPanel.children[1]);
};

// функция закрытия объявления и удаления подсветки маркера
var pinDeactivate = function (evt) {
  if (evt.keyCode === KEY_CODES.ESC || evt.type === EVENT_TYPES.CLICK) {
    offerPanel.classList.add('hidden');
    removeClass(pins, 'pin--active');
  }
};

// показать объяления
for (var i = 0; i < pins.length; i++) {
  pins[i].addEventListener(EVENT_TYPES.CLICK, pinActivate);
  pins[i].addEventListener(EVENT_TYPES.KEYDOWN, pinActivate);
}

// скрыть объявления
offerPanelClose.addEventListener(EVENT_TYPES.CLICK, pinDeactivate);
document.body.addEventListener(EVENT_TYPES.KEYDOWN, pinDeactivate);
