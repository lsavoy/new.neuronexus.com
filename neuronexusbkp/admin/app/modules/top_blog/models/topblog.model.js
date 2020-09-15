const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const status = ["Active", "Inactive"];
const resourceType = ["Image", "Video"];

const TopBlogSchema = new Schema({
  blog_index: {
    type: Number,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  summary: {
    type: String,
    default: ''
  },
  resource_type: {
    type: String,
    default: 'Image',
    enum: resourceType
  },
  resource: {
    type: String,
    default: ''
  },
  jump_url: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: 'Active',
    enum: status
  },
  isDeleted: {
    type: Boolean,
    default: false,
    enum: [true, false]
  },
});

// For pagination
TopBlogSchema.plugin(mongooseAggregatePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('top_blog', TopBlogSchema);
