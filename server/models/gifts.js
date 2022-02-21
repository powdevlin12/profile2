const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GiftSchema = new Schema({
    name: { type: String },
    description: { type: String },
    percentWin: { type: Number }
})

module.exports = mongoose.model('gifts', GiftSchema)