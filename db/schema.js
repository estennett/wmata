var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var LineSchema = new Schema(
  {
    stations: Array
  }
);

var StationSchema = new Schema(
  {
    stations: Array
  }
);

var LineModel = mongoose.model("Line", LineSchema);
var StationModel = mongoose.model("Station", StationSchema);

var BlueModel = mongoose.model("Blue", LineSchema);
var YellowModel = mongoose.model("Yellow", LineSchema);
var RedModel = mongoose.model("Red", LineSchema);
var GreenModel = mongoose.model("Green", LineSchema);
var OrangeModel = mongoose.model("Orange", LineSchema);
var SilverModel = mongoose.model("Silver", LineSchema);
