const Url = require('../models/url')

// helper functions
function validateUrl (value) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value)
}

module.exports = {
  createUrl (req, res, next) {
    const rand = Math.random().toString(36).substr(8)
    const originalUrl = req.params[0]
    if (!validateUrl(originalUrl)) {
      res.json({ 'error': 'invalid url' })
    } else {
      const newUrl = new Url({
        'original url': req.params[0],
        'short url': req.protocol + '://' + req.get('host') + '/' + rand,
        'urlId': rand
      })
      newUrl.save()
      return res.json({
        'original url': newUrl['original url'],
        'short url': newUrl['short url']
      })
    }
  },

  getShortUrl (req, res) {
    Url.findOne({ 'urlId': req.params.id })
      .then((url) => {
        if (!url) {
          res.json({ 'error': 'no url found' })
        } else {
          res.redirect(url['original url'])
        }
      }).catch(err => console.log(err))
  }

}
