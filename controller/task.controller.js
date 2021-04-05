const { Task } = require('../models');

module.exports.createTask = async (req, res, next) => {
  try {
    const { body, userInstance } = req;
    const task = await userInstance.createTask(body);
    res.status(201).send({ data: task });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserTasks = async (req, res, next) => {
  try {
    // const { userInstance } = req;
    // const tasks = await userInstance.getTasks();
    const {
      params: { id },
      query: { page = 1, size = 10 },
    } = req;
    if (page < 1 || size < 1) {
      return res.status(400).send('bad request: pagination');
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
      return res.status(404).send('Task not found');
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
      return res.status(403).send('You have no permission to edit this task');
    }
    const updatedTask = await Task.update(body, {
      where: { id: taskId },
      returning: true,
    });
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
      return res.status(403).send('You have no permission to delete this task');
    }
    const taskToDestroy = await Task.findByPk(taskId);
    const result = await taskToDestroy.destroy();
    res.status(200).send({ data: taskToDestroy });
  } catch (err) {
    next(err);
  }
};
