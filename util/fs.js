(function () {
  'use strict';

  var fs = require('fs');

  module.exports = {
    readFile: function(filepath) {
      return new Promise(function(fulfill, reject) {
        fs.readFile(filepath, function(err, data) {
          if (err) {
            reject(err);
          } else {
            fulfill(data);
          }
        });
      });
    }
  };
}());