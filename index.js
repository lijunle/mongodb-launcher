'use strict';

var mongodb = require('./mongodb');

mongodb.start();

process.on('SIGINT', function () {
  mongodb.shutdown();
});
