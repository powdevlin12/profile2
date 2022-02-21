const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, maxlength: 50, required: true },
    phone: { type: String, maxlength: 11, required: true }
})

module.exports = mongoose.model('users', UserSchema)