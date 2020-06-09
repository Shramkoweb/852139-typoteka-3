'use strict';
const http = require(`http`);
const chalk = require(`chalk`);

const {
  FILE_NAME,
  HttpCode,
} = require('../constants');

const {readContent} = require('../utils')

const sendResponse = (res, statusCode, message) => {
  const template = `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>With love from Node</title>
      </head>
      <body>${message}</body>
    </html>`.trim();

  res.statusCode = statusCode;
  res.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`,
  });

  res.end(template);
};

const requestHandler = async (req, res) => {
  const NOT_FOUND_MESSAGE = `Not found`;
  switch (req.url) {
    case `/`:
      try {
        const fileContent = await readContent(FILE_NAME);
        const mocks = JSON.parse(fileContent);
        const message = mocks.map((post) => `<li>${post.title}</li>`).join(``);
        sendResponse(res, HttpCode.OK, `<ul>${message}</ul>`);
      } catch (err) {
        sendResponse(res, HttpCode.NOT_FOUND, NOT_FOUND_MESSAGE);
      }

      break;
    default:
      sendResponse(res, HttpCode.NOT_FOUND, NOT_FOUND_MESSAGE);
      break;
  }
};

const initServer = (port) => {
  http.createServer(requestHandler)
    .listen(port)
    .on(`listening`, (error) => {
      if (error) {
        return console.error(`Ошибка при создании сервера`, error);
      }

      return console.info(chalk.green(`Ожидаю соединений на ${port}`));
    })
};

module.exports = {
  initServer,
};
