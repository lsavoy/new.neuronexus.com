const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const status = ['Active', 'Inactive'];

const testimonialsSchema = new Schema({
  title: { type: String, default: '' },
  content: { type: String, default: '' },
  video: { type: String, default: '' },
  slug: { type: String, default: '' },
  isDeleted: { type: Boolean, default: false, enum: [true, false] },
  status: { type: String, default: 'Active', enum: status },
}, {
  timestamps: true
});

// For pagination
testimonialsSchema.plugin(mongooseAggregatePaginate);

// create the model for category and expose it to our app
module.exports = mongoose.model('science_testimonials', testimonialsSchema);