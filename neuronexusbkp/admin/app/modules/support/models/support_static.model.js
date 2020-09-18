const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const status = ['Active', 'Inactive'];

const support_staticSchema = new Schema({
  title: { type: String, default: '' },
  content: { type: String, default: '' },
  header_banner_image: { type: String, default: '' },
  grant_support_page_title: { type: String, default: '' },
  training_videos_page_title: { type: String, default: '' },
  isDeleted: { type: Boolean, default: false, enum: [true, false] },
  status: { type: String, default: 'Active', enum: status },
}, { timestamps: true });

// For pagination
support_staticSchema.plugin(mongooseAggregatePaginate);

// create the model for CMS and expose it to our app
module.exports = mongoose.model('support_static', support_staticSchema);