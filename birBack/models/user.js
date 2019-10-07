const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt');
const uniqueValidator = require("mongoose-unique-validator");

const schema = new Schema ({
    name:  {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    creation_dt: {type: Date, require: true}
});

schema.plugin(uniqueValidator);

// schema.statics.hashPassword = function hashPassword(password) {
//     return bcrypt.hashSync(password, 10);
// }

// schema.methods.isValid = function(hashedpassword) {
//     return bcrypt.compareSync(hashedpassword, this.password);
// }


module.exports = mongoose.model('User', schema);