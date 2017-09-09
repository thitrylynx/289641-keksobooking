'use strict';

(function () {
  var offerPanel = document.getElementById('offer-dialog');
  var fragmentPanel = document.createDocumentFragment();
  var offerPanelTemplate = document.getElementById('lodge-template').content;
  window.showCard = {
    show: function (active) {
      window.backend.load(function () {
        var fragmentFeature = document.createDocumentFragment();
        var panelElement = offerPanelTemplate.cloneNode(true);
        offerPanel.appendChild(window.card.renderOfferPanel(window.data[active]));
        offerPanel.replaceChild(fragmentPanel, offerPanel.children[1]);
        panelElement.querySelector('.lodge__features').appendChild(fragmentFeature);
        offerPanel.classList.remove('hidden');
      });
    }
  };
})();

