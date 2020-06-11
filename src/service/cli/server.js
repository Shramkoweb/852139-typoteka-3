'use strict';

const {
  initServer,
} = require(`../../api/api.js`);

const {
  DefaultPort,
} = require(`../../constants`);

const {
  checkNumber,
} = require(`../../utils`);


module.exports = {
  name: `--server`,
  run(customPort) {
    const port = checkNumber(customPort, DefaultPort.SERVICE);


    initServer(port);
  }
}
