const express = require('express')
const app = express()
const mongoose = require('mongoose')
const config = require('./config')

// connect to MongoDB
mongoose.connect(config.db_uri)
const db = mongoose.connection
console.log(process.env)
// handle mongo Error
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => console.log('Connected to db!'))

// serve static files from /public
app.use(express.static(__dirname + '/public'))

// include routes
const routes = require('./routes/router')
app.use('/', routes)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('File Not Found')
  err.status = 404
  next(err)
})

// error handler
// define as the last app.use callback
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send(err.message)
})

// listen on port 3000
app.listen(3000, () => console.log('Listening on port 3000!'))
