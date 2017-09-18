'use strict';

window.Card = (function () {
  var offerPanelTemplate = document.getElementById('lodge-template').content;
  var offerPanel = document.getElementById('offer-dialog');
  var offerPanelClose = document.querySelector('.dialog__close');
  var renderOfferFeatures = function (array, fragment) {
    array.offer.features.forEach(function (featureElement) {
      var feature = document.createElement('span');
      feature.className = 'feature__image feature__image--' + featureElement;
      fragment.appendChild(feature);
    });
  };
  var renderOfferPanel = function (offer) {
    var fragmentFeature = document.createDocumentFragment();
    var panelElement = offerPanelTemplate.cloneNode(true);
    var dialogImage = document.querySelector('.dialog__title > img');
    panelElement.querySelector('.lodge__title').textContent = offer.offer.title;
    panelElement.querySelector('.lodge__address').textContent = offer.offer.address;
    panelElement.querySelector('.lodge__price').innerHTML = offer.offer.price + '&#x20bd;/ночь';
    panelElement.querySelector('.lodge__type').textContent = window.utils.translate(offer.offer.type);
    panelElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + offer.offer.guests + ' гостей в ' + offer.offer.rooms + ' комнатах';
    panelElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + offer.offer.checkin + ', ' + 'выезд до ' + offer.offer.checkout;
    renderOfferFeatures(offer, fragmentFeature);
    panelElement.querySelector('.lodge__features').appendChild(fragmentFeature);
    panelElement.querySelector('.lodge__description').textContent = offer.offer.description;
    dialogImage.setAttribute('src', offer.author.avatar);

    return panelElement;
  };
  var onClick = function () {
    if (offerPanel.classList.toggle('hidden')) {
      window.Card.hide();
      window.Pin.pinDeactivate();
      document.body.removeEventListener(window.utils.EVENT_TYPES.CLICK, onClick);
    }
  };
  var onKeyDown = function (evt) {
    if (evt.keyCode === window.utils.KEY_CODES.ESC) {
      if (offerPanel.classList.toggle('hidden')) {
        window.Card.hide();
        window.Pin.pinDeactivate();
        document.body.removeEventListener(window.utils.EVENT_TYPES.KEYDOWN, onKeyDown);
      }
    }
  };
  offerPanelClose.addEventListener(window.utils.EVENT_TYPES.CLICK, onClick);
  document.body.addEventListener(window.utils.EVENT_TYPES.KEYDOWN, onKeyDown);

  return {
    show: function (offer) {
      var fragmentPanel = document.createDocumentFragment();
      offerPanel.appendChild(renderOfferPanel(offer));
      offerPanel.replaceChild(fragmentPanel, offerPanel.children[1]);
      offerPanel.classList.remove('hidden');
    },
    hide: function () {
      offerPanel.classList.add('hidden');
    }
  };
})();

