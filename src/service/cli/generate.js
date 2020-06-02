'use strict';

const fs = require(`fs`);

const {
  CATEGORIES,
  SENTENCES,
  TITLES,
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
* getRandomInt(MIN_TEXT_LENGTH, MAX_ANNOUNCE_LENGTH) & getRandomInt(0, SENTENCES.length)
* сделал специально, дабы тут был разный размер контента */

const generatePublications = (count) => (
  [...Array(count)].map(() => ({
    title: getRandomItemFrom(TITLES),
    createdDate: getDateMinusMonth(getRandomInt(0, MAX_MONTH_PAST)),
    announce: shuffleArray(SENTENCES).slice(0, getRandomInt(MIN_TEXT_LENGTH, MAX_ANNOUNCE_LENGTH)).join(` `),
    fullText: shuffleArray(SENTENCES).slice(0, getRandomInt(MIN_TEXT_LENGTH, SENTENCES.length)).join(` `),
    category: [getRandomItemFrom(CATEGORIES), getRandomItemFrom(CATEGORIES)],
  }))
);

module.exports = {
  name: `--generate`,
  run(count) {
    if (count > MAX_PUBLICATION_AMOUNT) {
      return console.log(`Не больше 1000 публикаций`);
    }

    const countPublications = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generatePublications(countPublications));

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        return console.error(`Can't write data to file...`);
      }

      return console.info(`Operation success. File created.`);
    });
  }
}
