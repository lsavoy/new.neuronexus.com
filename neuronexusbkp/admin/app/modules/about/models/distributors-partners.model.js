const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const status = ['Active', 'Inactive'];

const partnersSchema = new Schema({
  country: { type: String, default: '' },
  company: { type: String, default: '' },
  company_link: { type: String, default: '' },
  company_info: { type: String, default: '' },
  isDeleted: { type: Boolean, default: false, enum: [true, false] },
  status: { type: String, default: 'Active', enum: status },
}, { timestamps: true });

// For pagination
partnersSchema.plugin(mongooseAggregatePaginate);

// create the model for CMS and expose it to our app
module.exports = mongoose.model('partners', partnersSchema);