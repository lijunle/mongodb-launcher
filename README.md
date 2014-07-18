Mongodb Launcher
===

A wrapper to launch Mongodb inside node.js, or as a forever service.

Usage
===

As a command
---

Run `node index.js` or `npm start` to start the mongodb in interactive mode.

With [forever][1], you can start it in daemon mode.

[1]: https://github.com/nodejitsu/forever

As a library
---

The following APIs are provided:

+ `start([port])`

  Start the mongodb server in code.

  If `port` variable is not provided, use environment's `MONGODB_PORT` variable.
  If both are not provided, the default `27017` will be used.

+ `connect([port], [database])`

  Connect to mongodb via [mongoose][2].

  If rule to evalute port number is same with `start` function. If `database`
  variable is evaluated from environment `MONGODB_DATABASE` variable, then the
  default `test` value.

  [2]: http://mongoosejs.com/

+ `Schema`

  Delegate the `mongoose.Schema` class.

License
===

MIT License.
