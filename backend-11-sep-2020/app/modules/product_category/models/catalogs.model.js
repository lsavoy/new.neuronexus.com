const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const status = ['Active', 'Inactive'];

const CatalogsAndBrochuresSchema = new Schema({
  catalog_title: { type: String, default: '' },
  catalog_file: { type: String, default: '' },
  brochures_title: { type: String, default: '' },
  brochures_file: { type: String, default: '' },
  isDeleted: { type: Boolean, default: false, enum: [true, false] },
  status: { type: String, default: 'Active', enum: status },
}, {
  timestamps: true
});

// For pagination
CatalogsAndBrochuresSchema.plugin(mongooseAggregatePaginate);

// create the model for category and expose it to our app

module.exports = mongoose.model('CatalogsAndBrochure', CatalogsAndBrochuresSchema);