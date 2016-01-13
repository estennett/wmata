var request = require('request');
var LineModel = require("../models/line");
var env = require ("../env.js");
var lineService = require("../services/lineService");

var linesController = {

  index: function(req, res){
    LineModel.find().then(function(data){
      res.json(data)
    })
  },

  getBlueLine: function(req, res){
    var blueLinePoints = "https://api.wmata.com/Rail.svc/json/jPath?FromStationCode=J03&ToStationCode=G05";
    lineService.getLine(req, res, blueLinePoints);
  },

  getRedLine: function(req, res){
    var redLinePoints = "https://api.wmata.com/Rail.svc/json/jPath?FromStationCode=A15&ToStationCode=B11";
    lineService.getLine(req, res, redLinePoints);
  },

  getYellowLine: function(req, res){
    var yellowLinePoints = "https://api.wmata.com/Rail.svc/json/jPath?FromStationCode=C15&ToStationCode=E06";
    lineService.getLine(req, res, yellowLinePoints);
  },

  getGreenLine: function(req, res){
    var greenLinePoints = "https://api.wmata.com/Rail.svc/json/jPath?FromStationCode=F11&ToStationCode=E10";
    lineService.getLine(req, res, greenLinePoints);
  },

  getOrangeLine: function(req, res){
    var orangeLinePoints = "https://api.wmata.com/Rail.svc/json/jPath?FromStationCode=K08&ToStationCode=D13";
    lineService.getLine(req, res, orangeLinePoints);
  },

  getSilverLine: function(req, res){
    var silverLinePoints = "https://api.wmata.com/Rail.svc/json/jPath?FromStationCode=N06&ToStationCode=G05";
    lineService.getLine(req, res, silverLinePoints);
  },
  //
  // getLine: function(req, res, url){
  //   var allStations = "https://api.wmata.com/Rail.svc/json/jStations";
  //
  //   var lineOptions = {
  //     url: url,
  //     headers: {
  //       'api_key': env.apiKey
  //     }
  //   };
  //
  //   var allStationsOptions = {
  //     url: allStations,
  //     headers: {
  //       'api_key': env.apiKey
  //     }
  //   };
  //
  //   var parsedLineData = [];
  //
  //   //Get Blue Line Data in Order [{LineCode: 'BL', StationCode: 'J03', StationName: 'Franconia-Springfield', SeqNume: 1, DistanceToPrev: 0}, {}, {}]
  //   request(lineOptions, function(err, response){
  //     var parsedBlueData = JSON.parse(response.body);
  //     var blueLineData = parsedBlueData.Path
  //
  //     //Get All Stations ***Not Ideal Here, But It Will Do For Now***
  //     //   [{ Code: 'N06',Name: 'Wiehle-Reston East',StationTogether1: '',StationTogether2: '',LineCode1: 'SV',LineCode2: null,
  //     // LineCode3: null,LineCode4: null,Lat: 38.947753,Lon: -77.340179,Address:{ Street: '1862 Wiehle Avenue',City: 'Reston',State: 'VA',Zip: '20190' }
  //     //   }, {next station}, {next station}]
  //     request (allStationsOptions, function(err, response){
  //       var parsedStationData = JSON.parse(response.body)
  //       var allStationsData = parsedStationData.Stations
  //
  //       for ( i = 0; i < blueLineData.length; i ++){
  //         for( j = 0; j < allStationsData.length; j ++){
  //           if (blueLineData[i].StationCode == allStationsData[j].Code ){
  //             var lineData = {StationName: allStationsData[j].Name, StationCode: allStationsData[j].Code, x: allStationsData[j].Lon, y: allStationsData[j].Lat};
  //             parsedLineData.push(lineData)
  //           }
  //         }
  //       }
  //
  //       var finalLineData = {stations: parsedLineData};
  //
  //       //save line to database
  //       LineModel.remove({}, function(err){
  //         console.log("Removed sub-documents for lines")
  //       });
  //
  //       LineModel.create(finalLineData).then(function(){
  //         LineModel.find({}).then(function(data){
  //           res.send(data)
  //         })
  //       })
  //       // res.send(parsedLineData);
  //     })//end All Stations Request
  //   })//end Blue Line Request
  //
  // }//end getLine function
}

module.exports = linesController;
