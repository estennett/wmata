var request = require('request');
var LineModel = require("../models/line");

var linesController = {

  index: function(req, res){
    LineModel.find().then(function(data){
      res.json(data)
    })
  },

  getLineData: function(req, res){
    var blueLine = "https://api.wmata.com/Rail.svc/json/jPath?FromStationCode=J03&ToStationCode=G05";
    var allStations = "https://api.wmata.com/Rail.svc/json/jStations";

    var options = {
      url: blueLine ,
      headers: {
        'api_key': 'df9b24e4adcc47d287d4d79fd3f0a801'
        }
    };

    var lineData= {};

    request(options, function (err, response){
      lineData.name = "blue";
      lineData.stationCoordinates = response.body;
      LineModel.create(lineData).then(function(){
        LineModel.find({name : "blue"}).then(function(data){
          var dataParsed = JSON.parse(data[0].stationCoordinates);
          res.send(dataParsed)
        })
        // LineModel.find({}).then(function(data){
        //   var dataParsed = JSON.parse(data[70].stationCoordinates) //super key to use JSON.parse here!
        //   res.send(dataParsed);
        // });
      })
    })//end of request
  }// end getLineData function

}//end linescontroller object

module.exports = linesController;
