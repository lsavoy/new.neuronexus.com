const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const status = ['Active','Inactive'];

const ProbrFinderSchema = new Schema({
  name: { type: String, default: '' },
  image: { type: String, default: '' },
  slug: { type: String, default: '' },
  site_layout_id: { type: Schema.Types.ObjectId, ref: 'SiteLayout', default: null },
  site_area_id: { type: Schema.Types.ObjectId, ref: 'SiteArea', default: null },
  shanks_id: { type: Schema.Types.ObjectId, ref: 'shanks', default: null },
  shank_length_id: { type: Schema.Types.ObjectId, ref: 'ShankLength', default: null },
  experiment_id: { type: Schema.Types.ObjectId, ref: 'Experiment', default: null },
  channel_id: { type: Schema.Types.ObjectId, ref: 'Channel', default: null },
  specification_title: { type: String, default: '' },
  specification_content: { type: String, default: '' },
  ordering_information_title: { type: String, default: '' },
  ordering_information_content: { type: String, default: '' },
  documentation_title: { type: String, default: '' },
  documentation_content: { type: String, default: '' },
  windows_link: { type: String, default: '' },
  mac_link: { type: String, default: '' },
  linux_link: { type: String, default: '' },
  isDeleted: {type: Boolean, default: false, enum: [true, false]},
  status: { type: String, default: 'Active', enum: status },
}, { timestamps: true });

// For pagination
ProbrFinderSchema.plugin(mongooseAggregatePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('ProbrFinder', ProbrFinderSchema);