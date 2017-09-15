'use strict';

(function () {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var pinMain = pinMap.querySelector('.pin__main');
  var addressInput = function () {
    var pinCoords = {
      x: (pinMain.offsetLeft + Math.floor(pinMain.offsetWidth / 2)),
      y: (pinMain.offsetTop + pinMain.offsetTop)
    };
    window.Form.setAddress('x: ' + pinCoords.x + ', ' + 'y: ' + pinCoords.y);
  };
  var onPinActive = function (offer) {
    window.Card.show(offer);
  };
  var onPinUnactive = function () {
    window.Card.hide();
  };
  var successHandler = function (offer) {
    window.Pin.renderPinList(offer, onPinActive, onPinUnactive);
  };
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; position: fixed; margin: 0 auto; text-align: center; background-color: red; left: 0; right: 0; color: white; font-size: 20px;';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.Backend.load(successHandler, errorHandler);
  pinMain.addEventListener(window.utils.EVENT_TYPES.MOUSEDOWN, function (evt) {
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
      document.removeEventListener(window.utils.EVENT_TYPES.MOUSEMOVE, onMouseMove);
      document.removeEventListener(window.utils.EVENT_TYPES.MOUSEUP, onMouseUp);
    };

    document.addEventListener(window.utils.EVENT_TYPES.MOUSEMOVE, onMouseMove);
    document.addEventListener(window.utils.EVENT_TYPES.MOUSEUP, onMouseUp);
  });
})();

