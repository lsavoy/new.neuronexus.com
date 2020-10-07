const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const status = ['Active', 'Inactive'];

const ProductLevel4Schema = new Schema({
  product_id: { type: Schema.Types.ObjectId, ref: 'Product' },
  name: { type: String, default: '' },
  slug: { type: String, default: '' },
  image: { type: String, default: '' },
  video: { type: String, default: '' },
  order_sort: { type: String, default: '' },
  short_content: { type: String, default: '' },
  content: { type: String, default: '' },
  section2_content: { type: String, default: '' },
  section2_name: { type: String, default: '' },
  section2_location: { type: String, default: '' },
  specification_title: { type: String, default: '' },
  specification_content: { type: String, default: '' },
  ordering_information_title: { type: String, default: '' },
  ordering_information_content: { type: String, default: '' },
  documentation_title: { type: String, default: '' },
  documentation_content: { type: String, default: '' },
  isDeleted: { type: Boolean, default: false, enum: [true, false] },
  status: { type: String, default: 'Active', enum: status },
}, {
  timestamps: true
});

// For pagination
ProductLevel4Schema.plugin(mongooseAggregatePaginate);

// create the model for category and expose it to our app
module.exports = mongoose.model('ProductLevel4', ProductLevel4Schema);
