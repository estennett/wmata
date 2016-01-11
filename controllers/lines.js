var request = require('request');
var LineModel = require("../models/line");
var env = require ("../env.js");

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
        'api_key': env.apiKey
        }
    };

    var lineData= {};

    request(options, function (err, response){
      lineData.name = "blue";
      lineData.stationCoordinates = response.body;
      console.log(response.body);
      LineModel.create(lineData).then(function(){
        LineModel.find({name : "blue"}).then(function(data){
          var dataParsed = JSON.parse(data[0].stationCoordinates);
          res.send(dataParsed)
        })
      })
    })//end of request
  }// end getLineData function

}//end linescontroller object

module.exports = linesController;
