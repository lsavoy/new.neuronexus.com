const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const LibrarySchema = new Schema({
  file_name: {
    type: String,
    default: ''
  },
  store_file_name: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  file_path: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

// For pagination
LibrarySchema.plugin(mongooseAggregatePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('library', LibrarySchema);
