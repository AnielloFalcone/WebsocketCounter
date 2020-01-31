const express = require('express');
const bodyParser = require('body-parser');
const PORT = 4000;

const router = express.Router();

module.exports = app => {
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use('/', router);

  app.listen(app.get('port'), () => {
    // eslint-disable-next-line no-console
    console.log(`Server running at: http://localhost:${process.env.PORT || PORT}`)
  });
};
