'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
module.exports = require('./' + process.env.NODE_ENV + '.js') || {};