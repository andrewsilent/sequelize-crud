const { Task } = require('../models');
const createError = require('http-errors');

module.exports.createTask = async (req, res, next) => {
  try {
    const { body, userInstance } = req;
    const task = await userInstance.createTask(body);
    if (!task) {
      const err = createError(400, 'Bad request, task was not created');
      return next(err);
    }
    res.status(201).send({ data: task });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserTasks = async (req, res, next) => {
  try {
    const {
      params: { id },
      query: { page = 1, size = 10 },
    } = req;
    if (page < 1 || size < 1) {
      const err = createError(400, 'Bad request. Pagination is invalid');
      return next(err);
    }
    const { count: total, rows: tasks } = await Task.findAndCountAll({
      where: {
        userId: id,
      },
      limit: size,
      offset: `${(page - 1) * size}`,
    });
    res.status(200).send({
      tasksCount: total,
      pagesCount: `${Math.ceil(total / size)}`,
      pageSize: size,
      currentPage: page,
      data: tasks,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserTask = async (req, res, next) => {
  try {
    const {
      userInstance,
      params: { taskId },
    } = req;
    const task = await userInstance.getTasks({
      where: { id: taskId },
    });
    if (task.length === 0) {
      const err = createError(404, 'Task not found');
      return next(err);
    }
    res.status(200).send({ data: task });
  } catch (err) {
    next(err);
  }
};

module.exports.updateUserTask = async (req, res, next) => {
  try {
    const {
      userInstance,
      body,
      params: { taskId },
    } = req;

    const permission = await userInstance.hasTask(taskId);

    if (!permission) {
      const err = createError(
        403,
        'Forbidden. You have no permission to edit this task',
      );
      return next(err);
    }

    const updatedTask = await Task.update(body, {
      where: { id: taskId },
      returning: true,
    });

    if (!updatedTask) {
      const err = createError(400, 'Bad request. Task was not updated');
      return next(err);
    }

    res.status(200).send({ data: updatedTask });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteUserTask = async (req, res, next) => {
  try {
    const {
      userInstance,
      params: { taskId },
    } = req;
    const permission = await userInstance.hasTask(taskId);
    if (!permission) {
      // return res.status(403).send('You have no permission to delete this task');
      const err = createError(
        403,
        'Forbidden. You have no permission to delete this task',
      );
      return next(err);
    }
    const taskToDestroy = await Task.findByPk(taskId);
    if (!taskToDestroy) {
      const err = createError(400, 'Bad request. Task was not removed');
      return next(err);
    }
    const result = await taskToDestroy.destroy();
    res.status(200).send({ data: taskToDestroy });
  } catch (err) {
    next(err);
  }
};
