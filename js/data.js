'use strict';

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
