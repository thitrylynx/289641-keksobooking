'use strict';

// функция отрисовки объявлений
(function () {
  var offerPanelTemplate = document.getElementById('lodge-template').content;
  var fragmentFeature = document.createDocumentFragment();
  var offerPanel = document.getElementById('offer-dialog');
  var fragmentPanel = document.createDocumentFragment();
  window.card = {
    renderOfferPanel: function (offer) {
      var panelElement = offerPanelTemplate.cloneNode(true);
      var dialogImage = document.querySelector('.dialog__title > img');

      for (var l = 0; l < offer.offer.features.length; l++) {
        var feature = document.createElement('span');
        feature.className = 'feature__image feature__image--' + offer.offer.features[l];
        fragmentFeature.appendChild(feature);
      }

      panelElement.querySelector('.lodge__title').textContent = offer.offer.title;
      panelElement.querySelector('.lodge__address').textContent = offer.offer.address;
      panelElement.querySelector('.lodge__price').innerHTML = offer.offer.price + '&#x20bd;/ночь';
      panelElement.querySelector('.lodge__type').textContent = offer.offer.type;
      panelElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + offer.offer.guests + ' гостей в ' + offer.offer.rooms + ' комнатах';
      panelElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + offer.offer.checkin + ', ' + 'выезд до ' + offer.offer.checkout;
      panelElement.querySelector('.lodge__features').appendChild(fragmentFeature);
      panelElement.querySelector('.lodge__description').textContent = offer.offer.description;
      dialogImage.setAttribute('src', offer.author.avatar);
      return panelElement;
    },
    openDialog: function (activePinNumber) {
      offerPanel.appendChild(window.card.renderOfferPanel(window.data[activePinNumber]));
      offerPanel.replaceChild(fragmentPanel, offerPanel.children[1]);
    }
  };
  window.pin.render(window.data);
})();

