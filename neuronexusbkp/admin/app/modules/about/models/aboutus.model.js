const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const status = ['Active', 'Inactive'];

const aboutusSchema = new Schema({
  title_h2: { type: String, default: '' },
  title_h3: { type: String, default: '' },
  header_banner_image: { type: String, default: '' },
  image: { type: String, default: '' },
  content: { type: String, default: '' },

  isDeleted: { type: Boolean, default: false, enum: [true, false] },
  status: { type: String, default: 'Active', enum: status },
}, { timestamps: true });

// For pagination
aboutusSchema.plugin(mongooseAggregatePaginate);

// create the model for CMS and expose it to our app
module.exports = mongoose.model('aboutus', aboutusSchema);