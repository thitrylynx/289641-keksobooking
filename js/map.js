'use strict';

(function () {
  var EVENT_TYPES = {
    CLICK: 'click',
    KEYDOWN: 'keydown',
    MOUSEDOWN: 'mousedown',
    MOUSEMOVE: 'mousemove',
    MOUSEUP: 'mouseup'
  };
  var KEY_CODES = {
    ENTER: 13,
    ESC: 27
  };
  var offerPanel = document.getElementById('offer-dialog');
  var offerPanelClose = document.querySelector('.dialog__close');
  var pinMap = document.querySelector('.tokyo__pin-map');
  var pins = pinMap.querySelectorAll('.pin:not(:first-child)');
  var pinMain = pinMap.querySelector('.pin__main');
  var address = document.getElementById('address');

  var addressInput = function () {
    var pinCoords = {
      x: (pinMain.offsetLeft + Math.floor(pinMain.offsetWidth / 2)),
      y: (pinMain.offsetTop + pinMain.offsetTop)
    };
    address.value = 'x: ' + pinCoords.x + ', ' + 'y: ' + pinCoords.y;
  };
  // функция добавления класса активного элемента при нажатии на маркер
  var renderOffer = function (evt) {
    var pinsArray = Array.prototype.slice.call(pins);
    window.utils.removeClass(pins, 'pin--active');
    var target = evt.currentTarget;
    target.classList.add('pin--active');
    var activePinNumber = pinsArray.indexOf(target);
    offerPanel.classList.remove('hidden');
    window.showCard.show(activePinNumber);
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
      window.utils.removeClass(pins, 'pin--active');
    }
  };
  window.backend.load(function (offer) {
    for (var k = 0; k < offer.length; k++) {
      document.querySelector('.tokyo__pin-map').appendChild(window.pin.renderPin(offer[k]));
      window.data = offer;
    }
  });
  // показать объяления
  for (var i = 0; i < pins.length; i++) {
    pins[i].addEventListener(EVENT_TYPES.CLICK, pinActivate);
    pins[i].addEventListener(EVENT_TYPES.KEYDOWN, pinActivate);
  }
  // скрыть объявления
  offerPanelClose.addEventListener(EVENT_TYPES.CLICK, pinDeactivate);
  document.body.addEventListener(EVENT_TYPES.KEYDOWN, pinDeactivate);

  pinMain.addEventListener(EVENT_TYPES.MOUSEDOWN, function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      addressInput();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      // проверка
      var totalCoordsY = pinMain.offsetTop - shift.y;
      var totalCoordsX = pinMain.offsetLeft - shift.x;
      var checkCoordsY = function () {
        if (totalCoordsY < 100) {
          totalCoordsY = 100;
        } else if (totalCoordsY > 570) {
          totalCoordsY = 570;
        } return totalCoordsY;
      };
      var checkCoordsX = function () {
        if (totalCoordsX < 0) {
          totalCoordsX = 0;
        } else if (totalCoordsX > 1130) {
          totalCoordsX = 1130;
        } return totalCoordsX;
      };
      pinMain.style.top = checkCoordsY() + 'px';
      pinMain.style.left = checkCoordsX() + 'px';
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener(EVENT_TYPES.MOUSEMOVE, onMouseMove);
      document.removeEventListener(EVENT_TYPES.MOUSEUP, onMouseUp);
    };

    document.addEventListener(EVENT_TYPES.MOUSEMOVE, onMouseMove);
    document.addEventListener(EVENT_TYPES.MOUSEUP, onMouseUp);
  });
})();

