var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var LineSchema = new Schema(
  {
    name: String,
    stationCoordinates: Object
  }
);

var StationSchema = new Schema(
  {
    stations: Array
  }
);

var LineModel = mongoose.model("Line", LineSchema);
var StationModel = mongoose.model("Station", StationSchema);

// title: String,
// stations: Object
