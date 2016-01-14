var request = require('request');
var LineModel = require("../models/line");
var env = require ("../env.js");

var stationPredictionController = {

  findStation: function(req, res){


    var stationOptions = {
      url: "https://api.wmata.com/StationPrediction.svc/json/GetPrediction/" + req.params.station,
      headers: {
        'api_key': env.apiKey
      }
    };

    request(stationOptions, function(err, response){
      var parsedData = JSON.parse(response.body);
      res.send(parsedData)
  })
}
}

module.exports = stationPredictionController
