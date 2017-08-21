'use strict';
// константы
var AVATAR_NUMBERS = ['01','02','03', '04', '05', '06', '07', '08'];
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['flat', 'house', 'bungalo'];
var TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var compareRandom = function(a, b) {
  return Math.random() - 0.5;
};
var getRandomInt = function (min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
var renderRandomNumber = function (value) {
  var valueResult = Math.floor(Math.random() * (value.length));
  return valueResult;
};

AVATAR_NUMBERS.sort(compareRandom);
TITLES.sort(compareRandom);
var popNumber = function () {
  var popedAvatar = AVATAR_NUMBERS.pop();
  return popedAvatar;
};
var popTitle = function () {
  var popedTitle = TITLES.pop();
  return popedTitle;
};

var getRandomLength = function () {
  var randomLengthArr = [];
  var randomLength = getRandomInt(1, 6);
  for (var i = 0; i < randomLength; i++) {
  randomLengthArr[i] = FEATURES[i];
  }
  return randomLengthArr;
};

var realty = [
  // 1-ый элемент
  {
    author: {
      avatar: './img/avatars/user' + popNumber() + '.png'
    },
    offer: {
      tittle: popTitle(),
      address: '',
      price: getRandomInt(1000, 1000000),
      type: TYPES[renderRandomNumber(TYPES)],
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 10),
      checkin: TIME[renderRandomNumber(TIME)],
      checkout: TIME[renderRandomNumber(TIME)],
      features: getRandomLength(),
      description: '',
      photos: ''
    },
    location: {
      x: getRandomInt(300, 900),
      y: getRandomInt(100, 500)
    }
  },
  // 2-ой элемент
  {
    author: {
      avatar: './img/avatars/user' + popNumber() + '.png'
    },
    offer: {
      tittle: popTitle(),
      address: '',
      price: getRandomInt(1000, 1000000),
      type: TYPES[renderRandomNumber(TYPES)],
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 10),
      checkin: TIME[renderRandomNumber(TIME)],
      checkout: TIME[renderRandomNumber(TIME)],
      features: getRandomLength(),
      description: '',
      photos: ''
    },
    location: {
      x: getRandomInt(300, 900),
      y: getRandomInt(100, 500)
    }
  },
  // 3-ий элемент
  {
    author: {
      avatar: './img/avatars/user' + popNumber() + '.png'
    },
    offer: {
      tittle: popTitle(),
      address: '',
      price: getRandomInt(1000, 1000000),
      type: TYPES[renderRandomNumber(TYPES)],
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 10),
      checkin: TIME[renderRandomNumber(TIME)],
      checkout: TIME[renderRandomNumber(TIME)],
      features: getRandomLength(),
      description: '',
      photos: ''
    },
    location: {
      x: getRandomInt(300, 900),
      y: getRandomInt(100, 500)
    }
  },
  // 4-ый элемент
  {
    author: {
      avatar: './img/avatars/user' + popNumber() + '.png'
    },
    offer: {
      tittle: popTitle(),
      address: '',
      price: getRandomInt(1000, 1000000),
      type: TYPES[renderRandomNumber(TYPES)],
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 10),
      checkin: TIME[renderRandomNumber(TIME)],
      checkout: TIME[renderRandomNumber(TIME)],
      features: getRandomLength(),
      description: '',
      photos: ''
    },
    location: {
      x: getRandomInt(300, 900),
      y: getRandomInt(100, 500)
    }
  },
  // 5-ый элемент
  {
    author: {
      avatar: './img/avatars/user' + popNumber() + '.png'
    },
    offer: {
      tittle: popTitle(),
      address: '',
      price: getRandomInt(1000, 1000000),
      type: TYPES[renderRandomNumber(TYPES)],
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 10),
      checkin: TIME[renderRandomNumber(TIME)],
      checkout: TIME[renderRandomNumber(TIME)],
      features: getRandomLength(),
      description: '',
      photos: ''
    },
    location: {
      x: getRandomInt(300, 900),
      y: getRandomInt(100, 500)
    }
  },
  // 6-ой элемент
  {
    author: {
      avatar: './img/avatars/user' + popNumber() + '.png'
    },
    offer: {
      tittle: popTitle(),
      address: '',
      price: getRandomInt(1000, 1000000),
      type: TYPES[renderRandomNumber(TYPES)],
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 10),
      checkin: TIME[renderRandomNumber(TIME)],
      checkout: TIME[renderRandomNumber(TIME)],
      features: getRandomLength(),
      description: '',
      photos: ''
    },
    location: {
      x: getRandomInt(300, 900),
      y: getRandomInt(100, 500)
    }
  },
  // 7-ой элемент
  {
    author: {
      avatar: './img/avatars/user' + popNumber() + '.png'
    },
    offer: {
      tittle: popTitle(),
      address: '',
      price: getRandomInt(1000, 1000000),
      type: TYPES[renderRandomNumber(TYPES)],
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 10),
      checkin: TIME[renderRandomNumber(TIME)],
      checkout: TIME[renderRandomNumber(TIME)],
      features: getRandomLength(),
      description: '',
      photos: ''
    },
    location: {
      x: getRandomInt(300, 900),
      y: getRandomInt(100, 500)
    }
  },
  // 8-ой элемент
  {
    author: {
      avatar: './img/avatars/user' + popNumber() + '.png'
    },
    offer: {
      tittle: popTitle(),
      address: '',
      price: getRandomInt(1000, 1000000),
      type: TYPES[renderRandomNumber(TYPES)],
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 10),
      checkin: TIME[renderRandomNumber(TIME)],
      checkout: TIME[renderRandomNumber(TIME)],
      features: getRandomLength(),
      description: '',
      photos: "{{location.x}}, {{location.y}}"
    },
    location: {
      x: getRandomInt(300, 900),
      y: getRandomInt(100, 500)
    }
  }
];


