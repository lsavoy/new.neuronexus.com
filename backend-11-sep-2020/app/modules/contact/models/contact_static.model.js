const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const status = ['Active', 'Inactive'];
const contact_staticSchema = new Schema({
  title_h2: { type: String, default: '' },
  title_h3: { type: String, default: '' },
  content: { type: String, default: '' },
  header_banner_image: { type: String, default: '' },
  isDeleted: { type: Boolean, default: false, enum: [true, false] },
  status: { type: String, default: 'Active', enum: status },
}, { timestamps: true });


// For pagination
contact_staticSchema.plugin(mongooseAggregatePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('contact_static', contact_staticSchema);