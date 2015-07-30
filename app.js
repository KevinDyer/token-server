(function () {
  'use strict';

  var PORT = process.env.PORT || 80;

  var https = require('https');
  var UtilFs = require('./util/fs');
  var config = require('./config');

  function getHttpsOptions() {
    var options = {};
    return UtilFs.readFile(config.serverKeyFilepath)
    .then(function(key) {
      options.key = key;
      return UtilFs.readFile(config.serverCertFilepath);
    })
    .then(function(cert) {
      options.cert = cert;
      return options;
    });
  }

  function startServer(options) {
    return new Promise(function(fulfill, reject) {
      var server = https.createServer(options);
      server.once('error', reject);
      server.listen(PORT, function() {
        fulfill(server);
      });
    });
  }

  getHttpsOptions()
  .then(function(options) {
    return startServer(options);
  })
  .then(null, function(res) {
    console.log(res);
  });
}());