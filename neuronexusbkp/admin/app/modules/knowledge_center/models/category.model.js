const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const status = ['Active', 'Inactive'];

const CategorySchema = new Schema({
  name: { type: String, default: '' },
  slug: { type: String, default: '' },
  parent_id: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
  isDeleted: { type: Boolean, default: false, enum: [true, false] },
  status: { type: String, default: 'Active', enum: status },
}, {
  timestamps: true
});

// For pagination
CategorySchema.plugin(mongooseAggregatePaginate);

// create the model for category and expose it to our app
module.exports = mongoose.model('Category_Knowledge', CategorySchema);