var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var request = require('request');
var cors = require('cors');
var conn = mongoose.connect('mongodb://localhost/wmata');

//setup express app
var app = express();

//controllers
var lineController = require("./controllers/lines");
var stationController = require("./controllers/stations");

//middleware
app.use(bodyParser.json());
app.use("*.json",function (req, res, next) {
  req.headers.accept = 'application/json';
  next();
});

//setting up the server
app.listen(process.env.PORT || 4000, function(){
  console.log("We are up and running!");
});

//routes
app.get("/line", cors(), lineController.index);
app.get("/linedata", cors(), lineController.getBlueLine);
app.get("/stations", cors(), stationController.getStationData);
