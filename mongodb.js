'use strict';

var spawn = require('child_process').spawn;
var path = require('path');
var util = require('util');

var resolvePort = function (port) {
  return port || process.env.MONGODB_PORT || 27017;
};

var resolveDatabase = function (database) {
  return datbase || process.env.MONGODB_DATABASE || 'test';
};

var start = function (port) {
  port = resolvePort(port);

  var dbpath = path.resolve(__dirname, './data');
  var mongod = spawn('mongod', ['--port', '' + port, '--dbpath', dbpath]);

  mongod.stdout.on('data', function (data) {
    process.stdout.write(data.toString());
  });

  mongod.stderr.on('data', function (data) {
    process.stdout.write(data.toString());
  });
};

var shutdown = function (port) {
  port = resolvePort(port);

  var dbpath = path.resolve(__dirname, './data');
  var mongod = spawn('mongod', ['--shutdown', '--port', '' + port,
                                '--dbpath', dbpath]);
};

var connection; // re-use the opening connection

var connect = function (port, database) {
  port = resolvePort(port);
  database = resolveDatabase(database);

  if (!connection) {
    connection = mongoose.createConnection(
      util.format('mongodb://localhost:%d/%s', port, database));

    connection.on('error', function (err) {
      console.error(err);
      connection.close();
    });

    connection.once('open', function () {
      console.log(util.format('connected to %s:%d, using database %s',
                              connection.host, connection.port, database));
    });

    connection.once('close', function () {
      connection = undefined;
    });
  }

  return connection;
};

module.exports = {
  start: start,
  shutdown: shutdown,
  connect: connect
};
