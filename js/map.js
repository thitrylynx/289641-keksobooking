'use strict';

(function () {
  var EVENT_TYPES = {
    CLICK: 'click',
    KEYDOWN: 'keydown'
  };
  var KEY_CODES = {
    ENTER: 13,
    ESC: 27
  };
  var offerPanel = document.getElementById('offer-dialog');
  var offerPanelClose = document.querySelector('.dialog__close');
  var pinMap = document.querySelector('.tokyo__pin-map');
  var pins = pinMap.querySelectorAll('.pin:not(:first-child)');
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
  // функция добавления класса активного элемента при нажатии на маркер
  var renderOffer = function (evt) {
    var pinsArray = Array.prototype.slice.call(pins);
    window.utils.removeClass(pins, 'pin--active');
    var target = evt.currentTarget;
    target.classList.add('pin--active');
    var activePinNumber = pinsArray.indexOf(target);
    offerPanel.classList.remove('hidden');
    window.card.openDialog(activePinNumber);
  };
  // показать объяления
  for (var i = 0; i < pins.length; i++) {
    pins[i].addEventListener(EVENT_TYPES.CLICK, pinActivate);
    pins[i].addEventListener(EVENT_TYPES.KEYDOWN, pinActivate);
  }
  // скрыть объявления
  offerPanelClose.addEventListener(EVENT_TYPES.CLICK, pinDeactivate);
  document.body.addEventListener(EVENT_TYPES.KEYDOWN, pinDeactivate);
})();
