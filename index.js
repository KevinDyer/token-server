(function () {
  'use strict';

  var PORT = process.env.PORT || 80;

  var express  = require('express');
  var MyServer = require('./server');

  var app = express();
  app.get('/', function(req, res) {
    res.status(200).json({success: true});
  });

  var myServer = new MyServer(app);
  myServer.listen(PORT);
}());