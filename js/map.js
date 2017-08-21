'use strict';

var AVATAR_NUMBERS = ['01','02','03', '04', '05', '06', '07', '08'];
var compareRandom = function(a, b) {
  return Math.random() - 0.5;
};
AVATAR_NUMBERS.sort(compareRandom);
var popNumber = function () {
  var poped = AVATAR_NUMBERS.pop();
  return poped;
};

var realty = [
  {
    author: {
      avatar: './img/avatars/user' + popNumber() + '.png'
    },
    offer: {
      tittle: '',
      address: '',
      price: '',
      type: '',
      rooms: '',
      guests: '',
      checkin: '',
      checkout: '',
      features: '',
      description: '',
      photos: ''
    },
    location: {
      x: '',
      y: ''
    }
  },
  {
    author: {
      avatar: './img/avatars/user' + popNumber() + '.png'
    },
    offer: {
      tittle: '',
      address: '',
      price: '',
      type: '',
      rooms: '',
      guests: '',
      checkin: '',
      checkout: '',
      features: '',
      description: '',
      photos: ''
    },
    location: {
      x: '',
      y: ''
    }
  },
  {
    author: {
      avatar: './img/avatars/user' + popNumber() + '.png'
    },
    offer: {
      tittle: '',
      address: '',
      price: '',
      type: '',
      rooms: '',
      guests: '',
      checkin: '',
      checkout: '',
      features: '',
      description: '',
      photos: ''
    },
    location: {
      x: '',
      y: ''
    }
  }
];

var NUMBERS = ['01', '02', '03', '04', '05', '06', '07', '08'];
var randomNumerOld = 0;

