const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const status = ['Active', 'Inactive'];

const science_static_con_Schema = new Schema({

  header_banner_image: { type: String, default: '' },
  testimonials_page_title: { type: String, default: '' },
  science_update_page_title: { type: String, default: '' },
  isDeleted: { type: Boolean, default: false, enum: [true, false] },
  status: { type: String, default: 'Active', enum: status },
}, {
  timestamps: true
});

// For pagination
science_static_con_Schema.plugin(mongooseAggregatePaginate);

// create the model for category and expose it to our app
module.exports = mongoose.model('science_static_content', science_static_con_Schema);