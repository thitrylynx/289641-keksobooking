'use strict';

(function () {
  var offerList = [];
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
  var showActivPin = function (evt) {
    var target = evt.currentTarget;
    target.classList.add('pin--active');
    offerPanel.classList.remove('hidden');
  };
  // функция подсветки активного маркера при клике (enter)
  var pinActivate = function (evt, offer) {
    if (evt.keyCode === KEY_CODES.ENTER || evt.type === EVENT_TYPES.CLICK) {
      var pins = pinMap.querySelectorAll('.pin:not(:first-child)');
      window.utils.removeClass(pins, 'pin--active');
      showActivPin(evt);
      window.showCard.show(offer);
    }
  };
  // функция закрытия объявления и удаления подсветки маркера
  var pinDeactivate = function (evt) {
    if (evt.keyCode === KEY_CODES.ESC || evt.type === EVENT_TYPES.CLICK) {
      offerPanel.classList.add('hidden');
      var pins = pinMap.querySelectorAll('.pin:not(:first-child)');
      window.utils.removeClass(pins, 'pin--active');
    }
  };
  var callback = function (offer) {
    return function (evt) {
      pinActivate(evt, offer);
    };
  };
  var renderPinList = function (offers) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offers.length; i++) {
      var id = i;
      var offer = offers[id];
      var pinEl = window.pin.renderPin(offer);
      fragment.appendChild(pinEl);
      pinEl.addEventListener(EVENT_TYPES.CLICK, callback(offer));
      pinEl.addEventListener(EVENT_TYPES.KEYDOWN, callback(offer));
    }
    document.querySelector('.tokyo__pin-map').appendChild(fragment);
  };
  var successHandler = function (offer) {
    offerList = offer;
    renderPinList(offerList);
  };
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; position: fixed; margin: 0 auto; text-align: center; background-color: red; left: 0; right: 0; color: white; font-size: 20px;';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };
  window.backend.load(successHandler, errorHandler);
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

