const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UrlSchema = new Schema({
  originalUrl: String,
  shortUrl: String
})

module.exports = UrlSchema
