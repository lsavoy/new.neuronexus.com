const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const status = ["Active", "Inactive"];

const ProductFeatureSchema = new Schema({
  feature_index: {
    type: String,
    default: ''
  },
  feature_img: {
    type: String,
    default: ''
  },
  feature_label: {
    type: String,
    default: ''
  },
  feature_description: {
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
ProductFeatureSchema.plugin(mongooseAggregatePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('Product_feature', ProductFeatureSchema);
