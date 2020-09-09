const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const status = ['Active', 'Inactive'];

const leadershipSchema = new Schema({
  name: { type: String, default: '' },
  qualification: { type: String, default: '' },
  designation: { type: String, default: '' },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  isDeleted: { type: Boolean, default: false, enum: [true, false] },
  status: { type: String, default: 'Active', enum: status },
}, { timestamps: true });

// For pagination
leadershipSchema.plugin(mongooseAggregatePaginate);

// create the model for CMS and expose it to our app
module.exports = mongoose.model('leadership', leadershipSchema);