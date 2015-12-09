/**
 ** 
 ** Main bootstrap file
 **
 **/

'use strict';


// Setup server
var restify = require('restify');
var server = require('./config/restify')(restify);
var config = require('./config/env');

// Routes
require('./routes')(server);

// Start server
server.listen(config.port, function () {console.log('%s listening at %s', server.name, server.url)});

exports.startServer = function (port, path, callback) {callback()}