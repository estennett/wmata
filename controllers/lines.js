var request = require('request');
var LineModel = require("../models/line");
var env = require ("../env.js");

var linesController = {

  index: function(req, res){
    LineModel.find().then(function(data){
      res.json(data)
    })
  },

  getBlueLine: function(req, res){

    var blueLinePoints = "https://api.wmata.com/Rail.svc/json/jPath?FromStationCode=J03&ToStationCode=G05";
    var allStations = "https://api.wmata.com/Rail.svc/json/jStations";

    var blueLineOptions = {
      url: blueLinePoints,
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
    request(blueLineOptions, function(err, response){
      var parsedBlueData = JSON.parse(response.body);
      var blueLineData = parsedBlueData.Path

      //Get All Stations ***Not Ideal Here, But It Will Do For Now***
      //   [{ Code: 'N06',Name: 'Wiehle-Reston East',StationTogether1: '',StationTogether2: '',LineCode1: 'SV',LineCode2: null,
      // LineCode3: null,LineCode4: null,Lat: 38.947753,Lon: -77.340179,Address:{ Street: '1862 Wiehle Avenue',City: 'Reston',State: 'VA',Zip: '20190' }
      //   }, {next station}, {next station}]
      request (allStationsOptions, function(err, response){
        var parsedStationData = JSON.parse(response.body)
        var allStationsData = parsedStationData.Stations
        // console.log(allStationsData)

        for ( i = 0; i < blueLineData.length; i ++){
          for( j = 0; j < allStationsData.length; j ++){
            if (blueLineData[i].StationCode == allStationsData[j].Code ){
              var lineData = {StationName: allStationsData[j].Name, StationCode: allStationsData[j].Code, x: allStationsData[j].Lon, y: allStationsData[j].Lat};
              parsedLineData.push(lineData)
            }
          }
        }
        console.log(parsedLineData);

      })//end All Stations Request

    })//end Blue Line Request

  }//end getBlueLine function

  // getLineData: function(req, res){
  //
  //   request(options, function (err, response){
  //     lineData.name = "blue";
  //     lineData.stationCoordinates = response.body;
  //     console.log(response.body);
  //     LineModel.create(lineData).then(function(){
  //       LineModel.find({name : "blue"}).then(function(data){
  //         var dataParsed = JSON.parse(data[0].stationCoordinates);
  //         res.send(dataParsed)
  //       })
  //     })
  //   })//end of request
  // }// end getLineData function

}//end linescontroller object

module.exports = linesController;


// getLineData: function(req, res){
//   var blueLine = "https://api.wmata.com/Rail.svc/json/jPath?FromStationCode=J03&ToStationCode=G05";
//   var allStations = "https://api.wmata.com/Rail.svc/json/jStations";
//
//   var options = {
//     url: blueLine ,
//     headers: {
//       'api_key': env.apiKey
//       }
//   };
//
//   var lineData= {};
//
//   request(options, function (err, response){
//     lineData.name = "blue";
//     lineData.stationCoordinates = response.body;
//     console.log(response.body);
//     LineModel.create(lineData).then(function(){
//       LineModel.find({name : "blue"}).then(function(data){
//         var dataParsed = JSON.parse(data[0].stationCoordinates);
//         res.send(dataParsed)
//       })
//     })
//   })//end of request
// }// end getLineData function
