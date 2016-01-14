var request = require('request');
var LineModel = require("../models/line");
var env = require ("../env.js");

var BlueModel = require("../models/blue");
var RedModel = require("../models/red");
var YellowModel = require("../models/yellow");
var OrangeModel = require("../models/orange");
var SilverModel = require("../models/silver");
var GreenModel = require("../models/green");

module.exports = {
  getLine: function(req, res, url, lineModel){
    var allStations = "https://api.wmata.com/Rail.svc/json/jStations";

    var lineOptions = {
      url: url,
      headers: {
        'api_key': env.apiKey
      }
    };

    var allStationsOptions = {
      url: allStations,
      headers: {
        'api_key': env.apiKey
      }
    };

    var parsedLineData = [];

    //Get Blue Line Data in Order [{LineCode: 'BL', StationCode: 'J03', StationName: 'Franconia-Springfield', SeqNume: 1, DistanceToPrev: 0}, {}, {}]
    request(lineOptions, function(err, response){
      var parsedBlueData = JSON.parse(response.body);
      var blueLineData = parsedBlueData.Path

      //Get All Stations ***Not Ideal Here, But It Will Do For Now***
      //   [{ Code: 'N06',Name: 'Wiehle-Reston East',StationTogether1: '',StationTogether2: '',LineCode1: 'SV',LineCode2: null,
      // LineCode3: null,LineCode4: null,Lat: 38.947753,Lon: -77.340179,Address:{ Street: '1862 Wiehle Avenue',City: 'Reston',State: 'VA',Zip: '20190' }
      //   }, {next station}, {next station}]
      request (allStationsOptions, function(err, response){
        var parsedStationData = JSON.parse(response.body)
        var allStationsData = parsedStationData.Stations

        for ( i = 0; i < blueLineData.length; i ++){
          for( j = 0; j < allStationsData.length; j ++){
            if (blueLineData[i].StationCode == allStationsData[j].Code ){
              var lineData = {StationName: allStationsData[j].Name, StationCode: allStationsData[j].Code, x: allStationsData[j].Lon, y: allStationsData[j].Lat};
              parsedLineData.push(lineData)
            }
          }
        }

        var finalLineData = {stations: parsedLineData};

        //save line to database
        lineModel.remove({}, function(err){
          console.log("Removed sub-documents for lines")
        });

        lineModel.create(finalLineData).then(function(){
          console.log('model was saved')
        })
        // res.send(parsedLineData);
      })//end All Stations Request
    })//end Blue Line Request

  }//end getLine function
}
