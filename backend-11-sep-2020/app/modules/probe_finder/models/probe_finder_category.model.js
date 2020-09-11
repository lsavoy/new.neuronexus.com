const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const status = ['Active', 'Inactive'];

const ProbrFinderCategorySchema = new Schema({
  menu_id: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
  isDeleted: { type: Boolean, default: false, enum: [true, false] },
  status: { type: String, default: 'Active', enum: status },
}, { timestamps: true });

// For pagination
ProbrFinderCategorySchema.plugin(mongooseAggregatePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('ProbrFinderCategory', ProbrFinderCategorySchema);