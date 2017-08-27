'use strict';

var OFFERS = [];
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

// функция случайной сортировки массива
var compareRandom = function () {
  return Math.random() - 0.5;
};

// функция получения случайного числа на заданном промежутке
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// функция получения случайного числа для массива
var renderRandomNumber = function (value) {
  return Math.floor(Math.random() * (value.length));
};

// функция получения случайного неповторяющегося значения из массива (аватар)
var getUniqueAvatar = function () {
  AVATAR_NUMBERS.sort(compareRandom);
  return AVATAR_NUMBERS.pop();
};

// функция получения случайного неповторяющегося значения из массива (заголовок)
var getuUniqueTitle = function () {
  TITLES.sort(compareRandom);
  return TITLES.pop();
};

// функция получения случайной длины массива
var getRandomArrayLength = function (array) {
  return array.slice(0, getRandomInt(0, array.length));
};

// функция создания массива случайных объявлений
var renderRandomDialogsArr = function (array, length) {
  for (var j = 0; j < length; j++) {
    var LOCATION_X = getRandomInt(300, 900);
    var LOCATION_Y = getRandomInt(100, 500);
    array.push({
      author: {
        avatar: './img/avatars/user' + getUniqueAvatar() + '.png'
      },
      offer: {
        title: getuUniqueTitle(),
        address: LOCATION_X + ', ' + LOCATION_Y,
        price: getRandomInt(1000, 1000000),
        type: TYPES[renderRandomNumber(TYPES)],
        rooms: getRandomInt(1, 5),
        guests: getRandomInt(1, 10),
        checkin: TIME[renderRandomNumber(TIME)],
        checkout: TIME[renderRandomNumber(TIME)],
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

// функция отрисовки маркеров
var renderFragmentPinMap = function (object) {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var fragmentPin = document.createDocumentFragment();
  for (var k = 0; k < 8; k++) {
    var newElement = document.createElement('div');
    var imgElement = document.createElement('img');

    newElement.classList.add('pin');
    newElement.style.left = object[k].location.x + PIN_WIDTH / 2 + 'px';
    newElement.style.top = object[k].location.y + PIN_HEIGHT + 'px';
    imgElement.classList.add('rounded');
    imgElement.style.width = PIN_WIDTH + 'px';
    imgElement.style.height = PIN_HEIGHT + 'px';
    imgElement.setAttribute('src', object[k].author.avatar);
    fragmentPin.appendChild(newElement);
    newElement.appendChild(imgElement);
  }
  pinMap.appendChild(fragmentPin);
};

// функция отрисовки объявлений
var renderOfferPanel = function (offer) {
  var offerPanelTemplate = document.getElementById('lodge-template').content;
  var panelElement = offerPanelTemplate.cloneNode(true);
  var fragmentFeature = document.createDocumentFragment();
  var dialogImage = document.querySelector('.dialog__title img');

  for (var l = 0; l < offer.features.length; l++) {
    var feature = document.createElement('span');
    feature.className = 'feature__image feature__image--' + offer.features[l];
    fragmentFeature.appendChild(feature);
  }

  panelElement.querySelector('.lodge__title').textContent = offer.title;
  panelElement.querySelector('.lodge__address').textContent = offer.address;
  panelElement.querySelector('.lodge__price').innerHTML = offer.price + '&#x20bd;/ночь';
  panelElement.querySelector('.lodge__type').textContent = offer.type;
  panelElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + offer.guests + ' гостей в ' + offer.rooms + ' комнатах';
  panelElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + offer.checkin + ', ' + 'выезд до ' + offer.checkout;
  panelElement.querySelector('.lodge__features').appendChild(fragmentFeature);
  panelElement.querySelector('.lodge__description').textContent = offer.description;
  dialogImage.setAttribute('src', OFFERS[0].author.avatar);
  return panelElement;
};

renderRandomDialogsArr(OFFERS, 8);
renderFragmentPinMap(OFFERS);

var offerPanel = document.getElementById('offer-dialog');
var getOfferPanel = renderOfferPanel(OFFERS[0].offer);

var fragmentPanel = document.createDocumentFragment();
offerPanel.appendChild(getOfferPanel);
offerPanel.replaceChild(fragmentPanel, offerPanel.children[1]);

