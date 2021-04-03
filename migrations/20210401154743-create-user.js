'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        field: 'first_name',
        allowNull: false,
        type: Sequelize.STRING(128)
      },
      lastName: {
        field: 'last_name',
        allowNull: false,
        type: Sequelize.STRING(128)
      },
      email: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING(128)
      },
      password: {
        field: 'password_hash',
        allowNull: false,
        type: Sequelize.TEXT
      },
      birthday: {
        type: Sequelize.DATEONLY
      },
      isMale: {
        field: 'is_male',
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};