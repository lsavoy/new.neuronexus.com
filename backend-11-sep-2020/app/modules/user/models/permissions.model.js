var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const deleted = [true, false];


var PermissionSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  about: { type: Boolean, default: false, enum: [true, false] },
  contact: { type: Boolean, default: false, enum: [true, false] },
  knowledge_center: { type: Boolean, default: false, enum: [true, false] },
  science_update: { type: Boolean, default: false, enum: [true, false] },
  product: { type: Boolean, default: false, enum: [true, false] },
  support: { type: Boolean, default: false, enum: [true, false] },
  home_slider: { type: Boolean, default: false, enum: [true, false] },
  setting: { type: Boolean, default: false, enum: [true, false] },
  probe_finder: { type: Boolean, default: false, enum: [true, false] },
  isDeleted: { type: Boolean, default: false, enum: deleted },
  isActive: { type: Boolean, default: true, enum: [true, false] },
}, { timestamps: true, versionKey: false });




// For pagination
PermissionSchema.plugin(mongooseAggregatePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('Permission', PermissionSchema);