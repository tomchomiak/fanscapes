'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UnitSchema = new Schema({
  primaryId: Number,
  unitId: Number,
  floorPlanId: Number,
  floorPlanName: String,
  buildingId: Number,
  buildingName: String,
  buildingCode: String,
  aptNumber: Number,
  squareFeetMin: Number,
  squareFeetMax: Number,
  numBathrooms: Number,
  numBedrooms: Number,
  rentMin: Number,
  rentMax: Number,
  unitedLeasedStatus: String,
  availability: {
    vacateMonth: String,
    vacateDay: String,
    vacateYear: String,
    vacancyClass: String,
    availabilityUrl: String
  }
});

module.exports = mongoose.model('One', UnitSchema);