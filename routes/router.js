const express = require('express')
const router = express.Router()

// GET route for homepage
router.get('/', (req, res, next) => {
  return res.sendFile(path.join(__dirname + '/public/index.html'))
})

module.exports = router
