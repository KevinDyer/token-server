(function () {
  'use strict';
  
  var path = require('path');

  module.exports = {
    serverKeyFilepath: path.resolve('./development/keys/key.pem'),
    serverCertFilepath: path.resolve('./development/keys/cert.pem'),
    secret: 'ilovescotchyscotch'
  };
}());