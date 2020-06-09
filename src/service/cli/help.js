'use strict';

const chalk = require(`chalk`);

module.exports = {
  name: `--help`,
  run() {
    const text = `
    Программа запускает http-сервер и формирует файл с данными для api.
    Гайд:
      service <command>

      Команды:
      --server <port>       запускает сервер на указанном порте
      --version:            выводит номер версии
      --help:               печатает этот текст
      --generate <count>    формирует файл mocks.json
    `;

    console.log(chalk.gray(text));
  }
};
