const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ContactSchema = new Schema({
    phone: { type: String, required: true },
    gmail: { type: String },
    github: { type: String },
    account: { type: Schema.Types.ObjectId, ref: "accounts" }
})
module.exports = mongoose.model('contacts', ContactSchema)