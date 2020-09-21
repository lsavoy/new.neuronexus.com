const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const status = ['Active', 'Inactive'];

const Product_static_con_Schema = new Schema({
  title: { type: String, default: '' },
  sub_title: { type: String, default: '' },
  content: { type: String, default: '' },
  header_banner_image: { type: String, default: '' },
  probe_finder_menu_name: { type: String, default: '' },
  catelog_menu_name: { type: String, default: '' },
  electrode_arrays_product_video_page_title: { type: String, default: '' },
  software_product_video_page_title: { type: String, default: '' },
  instrumentation_product_video_page_title: { type: String, default: '' },
  accessories_product_video_page_title: { type: String, default: '' },
  isDeleted: { type: Boolean, default: false, enum: [true, false] },
  status: { type: String, default: 'Active', enum: status },
}, {
  timestamps: true
});

// For pagination
Product_static_con_Schema.plugin(mongooseAggregatePaginate);

// create the model for category and expose it to our app
module.exports = mongoose.model('Product_static_content', Product_static_con_Schema);