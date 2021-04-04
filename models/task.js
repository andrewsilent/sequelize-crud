'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate (models) {
      Task.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  Task.init(
    {
      body: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /\w\s/i,
          notNull: true,
          notEmpty: true,
        },
      },
      isDone: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        field: 'is_done',
        validate: {
          notNull: true,
        },
      },
      deadline: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'Task',
      tableName: 'tasks',
      underscored: true,
    },
  );
  return Task;
};
