(function () {
  'use strict';

  var https = require('https');
  var config = require('./config');
  var UtilFs = require('./util/fs');

  var MyServer = function(app) {
    this.app = app;
  };

  MyServer.prototype = {
    _getHttpsOptions: function() {
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
    },

    listen: function(port) {
      var self = this;

      return self._getHttpsOptions()
      .then(function(options) {
        return new Promise(function(fulfill, reject) {
          self.server = https.createServer(options, self.app);
          self.server.on('error', reject);
          self.server.listen(port, function() {
            console.log(Date.now(), 'Listening...');
            fulfill(self.server);
          });
        });
      });
    }
  };

  module.exports = MyServer;

}());