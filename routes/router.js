const express = require('express')
const router = express.Router()
const path = require('path')

// GET route for homepage
router.get('/', (req, res, next) => {
  return res.sendFile(path.join(__dirname, '/public/index.html'))
})

// GET route for new URL

router.get('/new/*', (req, res, next) => {
  return res.send(req.url)
})

module.exports = router
