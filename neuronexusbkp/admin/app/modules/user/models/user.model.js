var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const deleted = [true, false];
const devicetype = ["android", "ios"];
const emailnotification = [true, false];
const notification = [true, false];
const registertype = ["normal", "facebook", "google", "apple"];

var UserSchema = new Schema({
  first_name: { type: String, default: '' },
  last_name: { type: String, default: '' },
  role: { type: Schema.Types.ObjectId, ref: 'Role' },
  phone: { type: String, default: '' },
  address: { type: String, default: '' },
  email: { type: String, default: '' },
  password: { type: String, default: '' },
  profile_image: { type: String, default: '' },
  deviceToken: { type: String, default: '' },
  deviceType: { type: String, default: 'android', enum: devicetype },
  verification_code: { type: Number, default: null },
  social_id: { type: String, default: '' },
  register_type: { type: String, default: 'normal', enum: registertype },
  isVerified: { type: Boolean, default: false, enum: [true, false] },
  isDeleted: { type: Boolean, default: false, enum: deleted },
  email_notification: { type: Boolean, default: true, enum: emailnotification },
  push_notification: { type: Boolean, default: true, enum: notification },
  isActive: { type: Boolean, default: true, enum: [true, false] },
}, { timestamps: true, versionKey: false });

// generating a hash
UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function (password, checkPassword) {
  return bcrypt.compareSync(password, checkPassword);
  //bcrypt.compare(jsonData.password, result[0].pass
};

// For pagination
UserSchema.plugin(mongooseAggregatePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('User', UserSchema);