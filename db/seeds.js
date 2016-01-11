var mongoose = require('mongoose');
var conn = mongoose.connect('mongodb://localhost/wmata');
var LineModel = require("../models/line");
var StationModel = require("../models/stations");

LineModel.remove({}, function(err){
  console.log("Removed sub-documents for lines")
});

StationModel.remove({}, function(err){
  console.log("Removed sub-documents for stations")
});

// var blueLine = new LineModel({"name": "blue"});
// var yellowLine = new LineModel({"name": "yellow"});
//
// blueLine.save(function(err){
//     if (err){
//       console.log("horrible error")
//     }else {
//       console.log("blueline was saved")
//     }
//   });
//
// yellowLine.save(function(err){
//     if (err){
//       console.log("horrible error")
//     }else {
//       console.log("yellowLine was saved")
//     }
//   });
