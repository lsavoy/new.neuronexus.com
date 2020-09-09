const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const status = ['Active', 'Inactive'];

const ScienceUpdateSchema = new Schema({
  title: { type: String, default: '' },
  image: { type: String, default: '' },
  content: { type: String, default: '' },
  slug: { type: String, default: '' },
  admin_id: { type: Schema.Types.ObjectId, ref: 'Users', default: null },
  category_id: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
  show_author_image: { type: Boolean, default: false, enum: [true, false] },
  show_post_date: { type: Boolean, default: false, enum: [true, false] },
  show_author_name: { type: Boolean, default: false, enum: [true, false] },
  isDeleted: { type: Boolean, default: false, enum: [true, false] },
  status: { type: String, default: 'Active', enum: status },
}, {
  timestamps: true
});

// For pagination
ScienceUpdateSchema.plugin(mongooseAggregatePaginate);

// create the model for category and expose it to our app
module.exports = mongoose.model('science_update', ScienceUpdateSchema);