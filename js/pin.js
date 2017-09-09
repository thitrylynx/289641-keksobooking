'use strict';

(function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;
  window.pin = {
    render: function (objects) {
      var fragmentPin = document.createDocumentFragment();
      for (var k = 0; k < window.data.length; k++) {
        var newElement = document.createElement('div');
        var imgElement = document.createElement('img');
        var offer = objects[k];

        newElement.classList.add('pin');
        newElement.style.left = (offer.location.x - PIN_WIDTH / 2) + 'px';
        newElement.style.top = (offer.location.y + PIN_HEIGHT) + 'px';
        imgElement.classList.add('rounded');
        imgElement.style.width = PIN_WIDTH + 'px';
        imgElement.style.height = PIN_HEIGHT + 'px';
        imgElement.setAttribute('src', offer.author.avatar);
        imgElement.setAttribute('tabindex', '0');
        fragmentPin.appendChild(newElement);
        newElement.appendChild(imgElement);
      }
      document.querySelector('.tokyo__pin-map').appendChild(fragmentPin);
    }
  };
})();
