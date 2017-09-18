'use strict';

window.Pin = (function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;
  var mapElement = document.querySelector('.tokyo__pin-map');
  var pinsList = [];
  var createPinEl = function (offer) {
    var newElement = document.createElement('div');
    var imageElement = document.createElement('img');

    newElement.classList.add('pin');
    newElement.style.left = (offer.location.x - PIN_WIDTH / 2) + 'px';
    newElement.style.top = (offer.location.y - 70) + 'px';
    imageElement.classList.add('rounded');
    imageElement.style.width = PIN_WIDTH + 'px';
    imageElement.style.height = PIN_HEIGHT + 'px';
    imageElement.setAttribute('src', offer.author.avatar);
    imageElement.setAttribute('tabindex', '0');
    newElement.appendChild(imageElement);

    return newElement;
  };
  var pinActivate = function (pinElement) {
    window.utils.removeClass(pinsList, 'pin--active');
    showActivePin(pinElement);
  };
  var pinDeactivate = function () {
    window.utils.removeClass(pinsList, 'pin--active');
  };
  var showActivePin = function (pinElement) {
    pinElement.classList.add('pin--active');
  };

  return {
    /*
     * Отрисовка пинов на основании списка объявлений.
     *
     * @param {Object[]} offers список объявлений
     * @param {function} [onActive] дейсвие при активации пина
     */

    renderPinList: function (offers, onActive) {
      var fragment = document.createDocumentFragment();
      offers.forEach(function (offer) {
        var pinElement = createPinEl(offer);
        var onPinKeyENTER = function (evt) {
          if (evt.keyCode === window.utils.KEY_CODES.ENTER) {
            pinActivate(pinElement, offer);
            if (onActive) {
              onActive(offer);
              pinElement.removeEventListener(window.utils.EVENT_TYPES.KEYDOWN, onPinKeyENTER);
            }
          }
        };
        var onPinClick = function (evt) {
          if (evt.type === window.utils.EVENT_TYPES.CLICK) {
            pinActivate(pinElement, offer);
            if (onActive) {
              onActive(offer);
              pinElement.removeEventListener(window.utils.EVENT_TYPES.KEYDOWN, onPinClick);
            }
          }
        };
        fragment.appendChild(pinElement);
        pinsList.push(pinElement);

        pinElement.addEventListener(window.utils.EVENT_TYPES.KEYDOWN, onPinKeyENTER);
        pinElement.addEventListener(window.utils.EVENT_TYPES.CLICK, onPinClick);
      });
      mapElement.appendChild(fragment);
    },
    pinDeactivate: pinDeactivate
  };
})();
