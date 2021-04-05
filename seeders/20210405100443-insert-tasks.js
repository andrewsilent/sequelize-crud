'use strict';

const { User } = require('../models');
const { taskSeed } = require('../constants/taskSeed');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await User.findAll({
      attributes: ['id'],
    });
    const tasks = users
      .map(u => {
        return new Array(Math.floor(Math.random() * 5))
          .fill(null)
          .map((_, i) => {
            const body = taskSeed
              .map(
                phraseList =>
                  phraseList[Math.floor(Math.random() * phraseList.length)],
              )
              .join('');
            console.log('body = ', body);
            return {
              user_id: u.id,
              body: body,
              created_at: new Date(),
              updated_at: new Date(),
            };
          });
      })
      .flat(2);
    await queryInterface.bulkInsert('tasks', tasks, {});
  },

  down: async (queryInterface, Sequelize) => {},
};
