const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config/development.json');
const db = require('./db');
const user = require('./controllers/user');
const file = require('./controllers/file');
function setUpServer() {
  app.use(bodyParser.urlencoded({ extended: false, limit: '4096mb' }));
  app.use(bodyParser.json({ limit: '4096mb' }));
  app.use(cors({}));
  app.use('/users', user);
  app.use('/file', file);
  const server = app.listen(config.api.port, err => {
    if (!err) {
      console.log(`Example app listening on port ${config.api.port}`);
    }
  });
}
async function initialize() {
  await setUpServer();
  await db.connect();
}

app.initialize = initialize;

module.exports = app;
