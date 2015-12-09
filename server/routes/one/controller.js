/*
 * GET     /one              ->  index
 * POST    /one              ->  create
 * GET     /one/:id          ->  show
 * PUT     /one/:id          ->  update
 * DELETE  /one/:id          ->  destroy
 */

'use strict';

var One = require('./model');

// Find all
exports.index = function(req, res, next) {
  One.find(function (err, data) {
    if(err) { return handleError(res, err); }
    return res.json(200, data);
  });
  next();
};

// Find one
exports.show = function(req, res, next) {
  One.findOne({'unitId': req.params.id}, function (err, unit) {
    if(err) { return handleError(res, err); }
    if(!unit) { return res.send(404); }
    return res.json(unit);
  });
  next();
};


// Create
exports.create = function(req, res, next) {
  One.create(req.body, function(err, unit) {
    if(err) { return handleError(res, err); }
    return res.json(201, unit);
  });
  next();
};

// Update
exports.update = function(req, res, next) {
  if(req.body._id) { delete req.body._id; }
  One.findById(req.params.id, function (err, unit) {
    if (err) { return handleError(res, err); }
    if(!unit) { return res.send(404); }
    var updated = _.merge(unit, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, unit);
    });
  });
  next();
};

// Delete
exports.destroy = function(req, res, next) {
  One.findById(req.params.id, function (err, unit) {
    if(err) { return handleError(res, err); }
    if(!unit) { return res.send(404); }
    unit.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
  next();
};



// Demo Assert
exports.demoAssert = function(req, res, next) {

    // Validate input for /one/:testParam/:testParam2
    
    // https://github.com/cjroebuck/restify-validator
    // https://github.com/chriso/validator.js
        
    req.assert('testParam', 'Invalid test param. Not integer.').isInt();
    req.assert('testParam2', 'Invalid test param2. Not Alphanumeric.').notEmpty().isAlpha();
    req.assert('testUrlParam', 'Not Empty.').notEmpty();
    req.assert('testUrlParam', 'Not alpha').isAlpha();

    // Check if have validation errors
    var errors = req.validationErrors();
    if (errors) {
      req.log.error('test buyan log error');
      return res.send(500, errors);
    }

    // Sanitize
    req.sanitize('testUrlParam').toBoolean();

    // If no errors return success
    res.json({
      success: true,
      testParam: req.params['testParam'],
      testParam2: req.params['testParam2'],
      testUrlParam: req.params['testUrlParam']
    });

  next();
};


function handleError(res, err) {
  return res.send(500, err);
}