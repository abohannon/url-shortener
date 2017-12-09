const Controller = require('../controllers/controller')

module.exports = (app) => {
  app.get('/', Controller.sendHome)
  app.get('/new/(*)', Controller.createUrl)
  app.get('/:id', Controller.getShortUrl)
}
