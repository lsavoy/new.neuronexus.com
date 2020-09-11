const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const status = ['Active', 'Inactive'];

const CategorySchema = new Schema({
  category_id: { type: Schema.Types.ObjectId, ref: 'Category' },
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
  d_drive_nano:{
    nano_title: { type: String, default: '' },
    nano_image: { type: String, default: '' },
    nano_des: { type: String, default: '' },
  },
  d_drive_m:{
    m_title: { type: String, default: '' },
    m_image: { type: String, default: '' },
    m_des: { type: String, default: '' },
  },
  d_drive_xl:{
    xl_title: { type: String, default: '' },
    xl_image: { type: String, default: '' },
    xl_des: { type: String, default: '' },
  },
  isDeleted: { type: Boolean, default: false, enum: [true, false] },
  status: { type: String, default: 'Active', enum: status },
}, {
  timestamps: true
});

// For pagination
CategorySchema.plugin(mongooseAggregatePaginate);

// create the model for category and expose it to our app
module.exports = mongoose.model('Product', CategorySchema);