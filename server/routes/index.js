/**
 ** Routes
 **/
'use strict';

var restify = require('restify');

module.exports = function(server) {
	
	// Controllers
	var one = require('./one/controller');

	// One Routes
	server.get('/one', one.index);
	server.get('/one/:id', one.show);
	server.get('/one/:testParam/:testParam2', one.demoAssert); // Demo Assert
	server.post('/one', one.create);
	server.put('/one/:id', one.update);
	server.del('/one/:id', one.destroy);


	// Serve Static
	server.get(/\/?.*/, restify.serveStatic({
	  directory: './public',
	  default: 'index.html'
	}));

}