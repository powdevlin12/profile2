const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ListSchema = new Schema({
    user: { type: String, ref: "users" },
    gift: { type: Schema.Types.ObjectId, ref: "gifts" },
    createAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('listwins', ListSchema)