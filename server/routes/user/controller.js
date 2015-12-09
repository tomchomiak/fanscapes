/*
 * GET     /one              ->  index
 * POST    /one              ->  create
 * GET     /one/:id          ->  show
 * PUT     /one/:id          ->  update
 * DELETE  /one/:id          ->  destroy
 */

'use strict';

var Two = require('./model');

// Find all
exports.index = function(req, res, next) {
  Two.find(function (err, data) {
    if(err) { return handleError(res, err); }
    return res.json(200, data);
  });
  next();
};

// Find one
exports.show = function(req, res, next) {
  Two.findOne({'unitId': req.params.id}, function (err, unit) {
    if(err) { return handleError(res, err); }
    if(!unit) { return res.send(404); }
    return res.json(unit);
  });
  next();
};


// Create
exports.create = function(req, res, next) {
  Two.create(req.body, function(err, unit) {
    if(err) { return handleError(res, err); }
    return res.json(201, unit);
  });
  next();
};

// Update
exports.update = function(req, res, next) {
  if(req.body._id) { delete req.body._id; }
  Two.findById(req.params.id, function (err, unit) {
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
  Two.findById(req.params.id, function (err, unit) {
    if(err) { return handleError(res, err); }
    if(!unit) { return res.send(404); }
    unit.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
  next();
};

function handleError(res, err) {
  return res.send(500, err);
}