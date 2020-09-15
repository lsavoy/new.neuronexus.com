const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const status = ["Active", "Inactive"];

const ImageCarouselSchema = new Schema({
  carousel_index: {
    type: Number,
    default: ''
  },
  carousel_img: {
    type: String,
    default: ''
  },
  jump_url: {
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
ImageCarouselSchema.plugin(mongooseAggregatePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('Image_carousel', ImageCarouselSchema);
