const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const status = ['Active', 'Inactive'];

const events_static_con_Schema = new Schema({

  header_banner_image: { type: String, default: '' },
  event_page_title: { type: String, default: '' },
  isDeleted: { type: Boolean, default: false, enum: [true, false] },
  status: { type: String, default: 'Active', enum: status },
}, {
  timestamps: true
});

// For pagination
events_static_con_Schema.plugin(mongooseAggregatePaginate);

// create the model for category and expose it to our app
module.exports = mongoose.model('events_static_content', events_static_con_Schema);