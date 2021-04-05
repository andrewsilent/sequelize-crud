'use strict';
const { maleNames, femaleNames, surnames } = require('../constants/nameSeed');

const generateUser = key => {
  const birthday = randomDate(new Date(1900, 0, 1), new Date());
  const isMale = Math.random() > 0.4 ? true : false;
  const firstName = isMale
    ? maleNames[Math.floor(Math.random() * maleNames.length)]
    : femaleNames[Math.floor(Math.random() * femaleNames.length)];
  const lastName = surnames[Math.floor(Math.random() * surnames.length)];
  const email = `${firstName}${lastName}${birthday.getYear()}@mail.com`.toLowerCase();
  const password = `${lastName}${birthday.getFullYear()}`;
  return {
    first_name: `${firstName}`,
    last_name: `${lastName}`,
    email: `${email}`,
    is_male: isMale,
    password_hash: `${password}`,
    birthday: birthday,
    created_at: new Date(),
    updated_at: new Date(),
  };
};

const generateUsers = amount => {
  return new Array(amount).fill(null).map((_, i) => generateUser(i));
};

function randomDate (start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', generateUsers(20), {});
  },

  down: async (queryInterface, Sequelize) => {},
};
