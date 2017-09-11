'use strict';

window.Backend = (function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';
  var setup = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          return onSuccess(xhr.response);
        case 301:
          return onError('Код «' + xhr.status + '» - ресурс перемещен');
        case 400:
          return onError('Код «' + xhr.status + '» - плохой, неверный запрос');
        case 404:
          return onError('Код «' + xhr.status + '» - страница не найдена');
        case 500:
          return onError('Код «' + xhr.status + '» - внутренняя ошибка сервера');
        default:
          throw onError('Неизвестная ошибка: код «' + xhr.status + '»');
      }
    });
    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });
    xhr.timeout = 10000;
    return xhr;
  };

  return {
    load: function (onSuccess, onError) {
      var xhr = setup(onSuccess, onError);
      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    },
    save: function (data, onSuccess, onError) {
      var xhr = setup(onSuccess, onError);
      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    }
  };
})();

