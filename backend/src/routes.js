const express = require('express');
const routes = express.Router();

const speechController = require('./controllers/speechController');

routes.get('/', (req, res) => res.send('API de comunicação do Clocker'));

routes.get('/speeches', speechController.list);
routes.post('/speeches', speechController.store);
routes.get('/speeches/start', speechController.start);
routes.get('/speeches/stop', speechController.stop);
routes.get('/speeches/last-command', speechController.lastCommand);

module.exports = routes;