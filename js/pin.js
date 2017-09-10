'use strict';

window.Pin = (function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;
  var mapEl = document.querySelector('.tokyo__pin-map');
  var pinElList = [];
  var createPinEl = function (offer) {
    var newElement = document.createElement('div');
    var imgElement = document.createElement('img');

    newElement.classList.add('pin');
    newElement.style.left = (offer.location.x - PIN_WIDTH / 2) + 'px';
    newElement.style.top = (offer.location.y - 70) + 'px';
    imgElement.classList.add('rounded');
    imgElement.style.width = PIN_WIDTH + 'px';
    imgElement.style.height = PIN_HEIGHT + 'px';
    imgElement.setAttribute('src', offer.author.avatar);
    imgElement.setAttribute('tabindex', '0');
    newElement.appendChild(imgElement);

    return newElement;
  };
  var pinActivate = function (pinEl) {
    window.utils.removeClass(pinElList, 'pin--active');
    showActivPin(pinEl);
  };
  var pinDeactivate = function () {
    window.utils.removeClass(pinElList, 'pin--active');
  };
  var showActivPin = function (pinEl) {
    pinEl.classList.add('pin--active');
  };

  return {
    /**
     * Отрисовка пинов на основании списка объявлений.
     *
     * @param {Object[]} offers список объявлений
     * @param {function} [onActive] дейсвие при активации пина
     * @param {function} [onUnactive] дейсвие при деактивации пина
     */
    renderPinList: function (offers, onActive, onUnactive) {
      var fragment = document.createDocumentFragment();
      offers.forEach(function (offer) {
        var pinEl = createPinEl(offer);
        fragment.appendChild(pinEl);
        pinElList.push(pinEl);

        pinEl.addEventListener(window.utils.EVENT_TYPES.CLICK, function (e) {
          if (e.keyCode === window.utils.KEY_CODES.ENTER
            || e.type === window.utils.EVENT_TYPES.CLICK) {
            pinActivate(pinEl, offer);
            if (onActive) {
              onActive(offer);
            }
          }
        });
        pinEl.addEventListener(window.utils.EVENT_TYPES.KEYDOWN, function (e) {
          if (e.keyCode === window.utils.KEY_CODES.ESC || e.type === window.utils.EVENT_TYPES.CLICK) {
            pinDeactivate(offer);
            if (onUnactive) {
              onUnactive(offer);
            }
          }
        });
      });
      mapEl.appendChild(fragment);
    },
    pinDeactivate: pinDeactivate,
  };
})();
