const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const KnowledgeCenterSchema = new Schema({
  title: { type: String, default: '', },
  slug: { type: String, default: '', },
  description: { type: String, default: '' },
  sub_category_id: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
  status: { type: String, default: "Active", enum: ["Active", "Inactive"] },
  isDeleted: { type: Boolean, default: false, enum: [true, false] },
  createdAt: { type: Date, default: Date.now(), },
  index: {type: Number, default: 0}
}, { versionKey: false });


// For pagination
KnowledgeCenterSchema.plugin(mongooseAggregatePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('KnowledgeCenter', KnowledgeCenterSchema);
