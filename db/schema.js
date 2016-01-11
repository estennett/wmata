var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var LineSchema = new Schema(
  {
    name: String,
    stationCoordinates: Object
  }
  //unnecessary for now
  // {
  //   toObject: {virtuals: true},
  //   toJSON: {virtuals: true}
  // }
);

var LineModel = mongoose.model("Line", LineSchema);
