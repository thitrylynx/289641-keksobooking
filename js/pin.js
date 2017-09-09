'use strict';

(function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;

  window.pin = {
    renderPin: function (offer) {
      var newElement = document.createElement('div');
      var imgElement = document.createElement('img');

      newElement.classList.add('pin');
      newElement.style.left = (offer.location.x - PIN_WIDTH / 2) + 'px';
      newElement.style.top = (offer.location.y) + 'px';
      imgElement.classList.add('rounded');
      imgElement.style.width = PIN_WIDTH + 'px';
      imgElement.style.height = PIN_HEIGHT + 'px';
      imgElement.setAttribute('src', offer.author.avatar);
      imgElement.setAttribute('tabindex', '0');
      newElement.appendChild(imgElement);

      return newElement;
    }
  };
})();
