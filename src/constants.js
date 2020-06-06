'use strict';

const DEFAULT_COUNT = 1;
const MIN_TEXT_LENGTH = 1;
const MAX_ANNOUNCE_LENGTH = 5;
const MAX_MONTH_PAST = 3;
const MAX_PUBLICATION_AMOUNT = 1000;
const DEFAULT_COMMAND = `--help`;
const USER_ARGV_INDEX = 2;
const FILE_NAME = `mocks.json`;

const ExitCode = {
  ERROR: 1,
  SUCCESS: 0,
};

module.exports = {
  DEFAULT_COMMAND,
  MIN_TEXT_LENGTH,
  USER_ARGV_INDEX,
  DEFAULT_COUNT,
  MAX_ANNOUNCE_LENGTH,
  MAX_PUBLICATION_AMOUNT,
  MAX_MONTH_PAST,
  FILE_NAME,
  ExitCode,
};
