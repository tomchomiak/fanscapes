/**
 ** Express config
 **/

'use strict';

var restify = require('restify');
var bunyan = require('bunyan');
var restifyValidator = require('restify-validator');

module.exports = function() {

  var name = process.env.APP_NAME || 'myPortfolio';
  var version = process.env.APP_VERSION || '1.0.0';
  var log = bunyan.createLogger({
    name: name,
    streams: [
      {
        path: 'log/access.log',
        level: 'info',
        type: 'rotating-file',
        period: '1d',   // daily rotation
        count: 3        // keep 3 back copies
      },
      {
        path: 'log/error.log',
        level: 'error',
        type: 'rotating-file',
        period: '1d',   // daily rotation
        count: 3        // keep 3 back copies
      },
      {
        path: 'log/fatal.log',
        level: 'fatal',
        type: 'rotating-file',
        period: '1d',   // daily rotation
        count: 3        // keep 3 back copies
      }
    ],
    serializers: {
        req: bunyan.stdSerializers.req
    }
  });


  var server = restify.createServer({
    name: name,
    version: version,
    log: log
  });


  // Access log
  server.pre(function (req, res, next) {
      req.log.info({ req: req }, 'REQUEST');
      next();
  });


  server.use(restify.queryParser());
  server.use(restify.bodyParser());
  server.use(restify.gzipResponse());
  server.use(restifyValidator);

  return server;
};