const { Router } = require('express');
const TaskController = require('../controller/task.controller');
const { checkUser } = require('../middlewares/user.mw');
const taskRouter = Router();

taskRouter.post('/:id/task', checkUser, TaskController.createTask);
taskRouter.get('/:id/tasks', checkUser, TaskController.getUserTasks);
taskRouter.get('/:id/task/:taskId', checkUser, TaskController.getUserTask);
taskRouter.patch(
  '/:id/task/:taskId',
  checkUser,
  TaskController.updateUserTask,
);
taskRouter.delete(
  '/:id/task/:taskId',
  checkUser,
  TaskController.deleteUserTask,
);

module.exports = taskRouter;
