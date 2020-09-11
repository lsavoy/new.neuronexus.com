const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const status = ['Active','Inactive'];

const ChannelSchema = new Schema({
  title: { type: String, default: '' },
  slug: { type: String, default: '' },
  isDeleted: {type: Boolean, default: false, enum: [true, false]},
  status: { type: String, default: 'Active', enum: status },
}, { timestamps: true });

// For pagination
ChannelSchema.plugin(mongooseAggregatePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('Channel', ChannelSchema);