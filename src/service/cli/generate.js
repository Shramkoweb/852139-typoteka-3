'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const SENTENCES_FILE_PATH = `./data/sentences.txt`;
const TITLES_FILE_PATH = `./data/titles.txt`;
const CATEGORIES_FILE_PATH = `./data/categories.txt`;

const {
  MAX_MONTH_PAST,
  FILE_NAME,
  MAX_ANNOUNCE_LENGTH,
  MIN_TEXT_LENGTH,
  MAX_PUBLICATION_AMOUNT,
  DEFAULT_COUNT,
} = require(`../../constants`);

const {
  shuffleArray,
  getRandomInt,
  getRandomItemFrom,
  checkNumber,
} = require(`../../utils`);

/* Выглядит ужасно, но не придумал как лучше
привести дату к формату "2019-12-01 14:45:00" */

const getDateMinusMonth = (monthAmount) => {
  const currentDate = new Date();
  const calculatedNewDate = new Date(currentDate.setMonth(currentDate.getMonth() - monthAmount));
  const formatedDate = calculatedNewDate
    .toISOString()
    .replace('T', ' ')
    .substr(0, 19);

  return formatedDate;
};

/*
* Немного сложно вышло с генерацией announce & fullText
* getRandomInt(MIN_TEXT_LENGTH, MAX_ANNOUNCE_LENGTH) & getRandomInt(0, sentences.length)
* сделал специально, дабы тут был разный размер контента */

const generatePublications = (count, titles, sentences, categories) => (
  [...Array(count)].map(() => ({
    title: getRandomItemFrom(titles),
    createdDate: getDateMinusMonth(getRandomInt(0, MAX_MONTH_PAST)),
    announce: shuffleArray(sentences).slice(0, getRandomInt(MIN_TEXT_LENGTH, MAX_ANNOUNCE_LENGTH)).join(` `),
    fullText: shuffleArray(sentences).slice(0, getRandomInt(MIN_TEXT_LENGTH, sentences.length)).join(` `),
    category: [getRandomItemFrom(categories), getRandomItemFrom(categories)],
  }))
);

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return content
      .trim()
      .split(`\n`);
  } catch (error) {
    console.error(chalk.red(error));
    return [];
  }
};

module.exports = {
  name: `--generate`,
  async run(count) {
    const countPublications = checkNumber(count, DEFAULT_COUNT);

    if (countPublications > MAX_PUBLICATION_AMOUNT) {
      return console.log(chalk.red(`Не больше 1000 публикаций`));
    }

    const titlesPromise = readContent(TITLES_FILE_PATH);
    const sentencesPromise = readContent(SENTENCES_FILE_PATH);
    const categoriesPromise = readContent(CATEGORIES_FILE_PATH);

    const [
      titles,
      sentences,
      categories,
    ] = await Promise.all([
      titlesPromise,
      sentencesPromise,
      categoriesPromise,
    ]);


    const content = JSON.stringify(generatePublications(countPublications, titles, sentences, categories));

    try {
      fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`))
    } catch (error) {
      console.log(error)
      console.error(chalk.red(`Can't write data to file...`))
    }
  }
}
