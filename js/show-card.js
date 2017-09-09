'use strict';

(function () {
  var offerPanel = document.getElementById('offer-dialog');
  var fragmentPanel = document.createDocumentFragment();
  window.showCard = {
    show: function (active) {
      offerPanel.appendChild(window.card.renderOfferPanel(window.data[active]));
      offerPanel.replaceChild(fragmentPanel, offerPanel.children[1]);
    }
  };
})();
