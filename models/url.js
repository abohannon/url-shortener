const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UrlSchema = new Schema({
  'original url': String,
  'short url': String,
  'urlId': String
})

const Url = mongoose.model('url', UrlSchema)

module.exports = Url
