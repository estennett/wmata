var request = require('request');
var StationModel = require("../models/stations");
var env = require ("../env.js");

var stationController = {

  getStationData: function(req, res){
    var allStations = "https://api.wmata.com/Rail.svc/json/jStations";

    var options = {
      url: allStations,
      headers: {
        'api_key': env.apiKey
        }
    };

    request(options, function (err, response){

      var stationBody = JSON.parse(response.body)
      var stationData= { stations : stationBody.Stations };
      console.log(stationData)

      StationModel.create(stationData).then(function(){
        StationModel.find({}).then(function(data){
          var stations = [];
          for (var i = 0; i < data[0].stations.length; i++){
            var station = [];
            station.push(data[0].stations[i].Lon);
            station.push(data[0].stations[i].Lat);
            station.push(data[0].stations[i].LineCode1);
            station.push(data[0].stations[i].Name);
            station.push(data[0].stations[i].Code);
            stations.push(station);
          }
          res.send(stations)
        })
      })

    })//end of request
  }// end getLineData function

}//end linescontroller object

module.exports = stationController;
