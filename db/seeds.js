var mongoose = require('mongoose');
var conn = mongoose.connect('mongodb://localhost/wmata');
var LineModel = require("../models/line");
var StationModel = require("../models/stations");
var SeedsController = require("../controllers/seeds")

var BlueModel = require("../models/blue");
var RedModel = require("../models/red");
var YellowModel = require("../models/yellow");
var OrangeModel = require("../models/orange");
var SilverModel = require("../models/silver");
var GreenModel = require("../models/green");

LineModel.remove({}, function(err){
  console.log("Removed sub-documents for lines")
});

StationModel.remove({}, function(err){
  console.log("Removed sub-documents for stations")
});

getBlueLine();
getRedLine();
getYellowLine();
getGreenLine();
getOrangeLine();
getSilverLine();

  function getBlueLine(req, res){
    var blueLinePoints = "https://api.wmata.com/Rail.svc/json/jPath?FromStationCode=J03&ToStationCode=G05";
    var lineModel = BlueModel;
    SeedsController.getLine(req, res, blueLinePoints, lineModel);
  }

  function getRedLine(req, res){
    var redLinePoints = "https://api.wmata.com/Rail.svc/json/jPath?FromStationCode=A15&ToStationCode=B11";
    var lineModel = RedModel;
    SeedsController.getLine(req, res, redLinePoints, lineModel);
  }

  function getYellowLine(req, res){
    var yellowLinePoints = "https://api.wmata.com/Rail.svc/json/jPath?FromStationCode=C15&ToStationCode=E06";
    var lineModel = YellowModel;
    SeedsController.getLine(req, res, yellowLinePoints, lineModel);
  }

  function getGreenLine(req, res){
    var greenLinePoints = "https://api.wmata.com/Rail.svc/json/jPath?FromStationCode=F11&ToStationCode=E10";
    var lineModel = GreenModel;
    SeedsController.getLine(req, res, greenLinePoints, lineModel);
  }

  function getOrangeLine(req, res){
    var orangeLinePoints = "https://api.wmata.com/Rail.svc/json/jPath?FromStationCode=K08&ToStationCode=D13";
    var lineModel = OrangeModel;
    SeedsController.getLine(req, res, orangeLinePoints, lineModel);
  }

  function getSilverLine(req, res){
    var silverLinePoints = "https://api.wmata.com/Rail.svc/json/jPath?FromStationCode=N06&ToStationCode=G05";
    var lineModel = SilverModel;
    SeedsController.getLine(req, res, silverLinePoints, lineModel);
  }
