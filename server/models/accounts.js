const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AccountSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number },
    homeTown: { type: String },
    school: { type: String },
    favourite: { type: String },
    img: { type: String }
})
module.exports = mongoose.model('accounts', AccountSchema)