'use strict';

// функция отрисовки объявлений
(function () {
  var offerPanelTemplate = document.getElementById('lodge-template').content;
  var fragmentFeature = document.createDocumentFragment();
  window.card = {
    renderOfferPanel: function (offer) {
      var panelElement = offerPanelTemplate.cloneNode(true);
      var dialogImage = document.querySelector('.dialog__title > img');
      panelElement.querySelector('.lodge__title').textContent = offer.offer.title;
      panelElement.querySelector('.lodge__address').textContent = offer.offer.address;
      panelElement.querySelector('.lodge__price').innerHTML = offer.offer.price + '&#x20bd;/ночь';
      panelElement.querySelector('.lodge__type').textContent = offer.offer.type;
      panelElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + offer.offer.guests + ' гостей в ' + offer.offer.rooms + ' комнатах';
      panelElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + offer.offer.checkin + ', ' + 'выезд до ' + offer.offer.checkout;
      var feature = document.createElement('span');
      feature.className = 'feature__image feature__image--' + offer.offer.features;
      panelElement.querySelector('.lodge__description').textContent = offer.offer.description;
      dialogImage.setAttribute('src', offer.author.avatar);
      fragmentFeature.appendChild(feature);
      return panelElement;
    }
  };
})();

