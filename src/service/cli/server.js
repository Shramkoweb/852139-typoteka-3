'use strict';

const {
  initServer,
} = require(`../../api/api.js`);

const {
  DEFAULT_PORT,
} = require(`../../constants`);

const {
  checkNumber,
} = require(`../../utils`);


module.exports = {
  name: `--server`,
  run(customPort) {
    const port = checkNumber(customPort, DEFAULT_PORT);


    initServer(port);
  }
}
