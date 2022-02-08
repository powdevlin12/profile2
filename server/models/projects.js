const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    language: { type: String },
    link: { type: String },
    img: { type: String },
    account: { type: Schema.Types.ObjectId, ref: "accounts" }
})
module.exports = mongoose.model('projects', ProjectSchema)