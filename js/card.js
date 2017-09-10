'use strict';

window.Card = (function () {
  var offerPanelTemplate = document.getElementById('lodge-template').content;
  var offerPanel = document.getElementById('offer-dialog');
  var offerPanelClose = document.querySelector('.dialog__close');

  // TODO подписывать только когда карточка открыта
  // TODO при закрытие карточки отписываться
  offerPanelClose.addEventListener(window.utils.EVENT_TYPES.CLICK, function () {
    window.Card.hide();
    window.Pin.pinDeactivate();
  });
  document.body.addEventListener(window.utils.EVENT_TYPES.KEYDOWN, function () {
    window.Card.hide();
    window.Pin.pinDeactivate();
  });

  return {
    // TODO надо репеписать
    // убрать из глобальной области видимости
    renderOfferPanel: function (offer) {
      var fragmentFeature = document.createDocumentFragment();
      var panelElement = offerPanelTemplate.cloneNode(true);
      var dialogImage = document.querySelector('.dialog__title > img');
      panelElement.querySelector('.lodge__title').textContent = offer.offer.title;
      panelElement.querySelector('.lodge__address').textContent = offer.offer.address;
      panelElement.querySelector('.lodge__price').innerHTML = offer.offer.price + '&#x20bd;/ночь';
      panelElement.querySelector('.lodge__type').textContent = offer.offer.type;
      panelElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + offer.offer.guests + ' гостей в ' + offer.offer.rooms + ' комнатах';
      panelElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + offer.offer.checkin + ', ' + 'выезд до ' + offer.offer.checkout;
      // TODO вынести в функцию рендера  фичь
      offer.offer.features.forEach(function (f) {
        var feature = document.createElement('span');
        feature.className = 'feature__image feature__image--' + f;
        fragmentFeature.appendChild(feature);
      });
      panelElement.querySelector('.lodge__features').appendChild(fragmentFeature);
      panelElement.querySelector('.lodge__description').textContent = offer.offer.description;
      dialogImage.setAttribute('src', offer.author.avatar);

      return panelElement;
    },
    show: function (offer) {
      var fragmentPanel = document.createDocumentFragment();
      offerPanel.appendChild(window.Card.renderOfferPanel(offer));
      offerPanel.replaceChild(fragmentPanel, offerPanel.children[1]);
      offerPanel.classList.remove('hidden');
    },
    hide: function () {
      offerPanel.classList.add('hidden');
    }
  };
})();

