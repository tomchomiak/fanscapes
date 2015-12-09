'use strict';

var path = require('path');

// Development specific configuration
module.exports = {
  
  env: process.env.NODE_ENV,

  // Server port
  port: process.env.PORT || 8080
  
};