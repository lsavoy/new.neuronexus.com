const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const status = ['Active', 'Inactive'];

const technology_categorySchema = new Schema({
  title: { type: String, default: '' },
  slug: { type: String, default: '' },
  content: { type: String, default: '' },
  parent_id: { type: Schema.Types.ObjectId, ref: 'technology_category', default: null },
  isDeleted: { type: Boolean, default: false, enum: [true, false] },
  isHome: { type: Boolean, default: false, enum: [true, false] },
  order_sort: { type: String, default: '' },
  image: { type: String, default: '' },
  status: { type: String, default: 'Active', enum: status },
}, { timestamps: true });

// For pagination
technology_categorySchema.plugin(mongooseAggregatePaginate);

// create the model for CMS and expose it to our app
module.exports = mongoose.model('technology_category', technology_categorySchema);