const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const routes = require('./routes/router')
const config = require('./config')

const port = process.env.PORT || 3000

mongoose.Promise = global.Promise

// connect to MongoDB
mongoose.connect(config.db_uri)
const db = mongoose.connection

// handle mongo Error
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => console.log('Connected to db!'))

// serve static files from /public
app.use(express.static(path.join(`${__dirname}/public`)))

// include routes
routes(app)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('File Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send(err.message)
})

// listen on port 3000
app.listen(port, () => console.log(`Listening on port ${port}!`))
