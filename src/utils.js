'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;

const getRandomInt = (min, max) => {
  const minimal = Math.ceil(min);
  const maximal = Math.floor(max);

  return Math.floor(Math.random() * (maximal - minimal + 1)) + minimal;
};

const getRandomItemFrom = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const shuffleArray = (array) => {
  const shuffledArray = array.slice();

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [shuffledArray[i], shuffledArray[randomPosition]] = [shuffledArray[randomPosition], shuffledArray[i]];
  }

  return shuffledArray;
};

const checkNumber = (number, defaultValue, base = 10) => {
  const parsed = Number.parseInt(number, base);
  if (isNaN(parsed)) {
    return defaultValue;
  }

  return  parsed;
};

const readContent = async (filePath) => {
  try {
    return await fs.readFile(filePath, `utf8`);
  } catch (err) {
    console.error(chalk.red(err));
  }
};

const splitString = (string) => string.trim().split(`\n`);

module.exports = {
  getRandomInt,
  shuffleArray,
  getRandomItemFrom,
  checkNumber,
  readContent,
  splitString,
};
