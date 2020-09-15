const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const status = ["Active", "Inactive"];

const VideoCarouselSchema = new Schema({
  carousel_index: {
    type: Number,
    default: ''
  },
  video_url: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: 'Active',
    enum: status
  },
  isDeleted: {
    type: Boolean,
    default: false,
    enum: [true, false]
  },
});

// For pagination
VideoCarouselSchema.plugin(mongooseAggregatePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('Video_carousel', VideoCarouselSchema);
