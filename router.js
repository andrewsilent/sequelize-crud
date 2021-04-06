const { Router } = require('express');
const UserController = require('./controller/user.controller');
const TaskController = require('./controller/task.controller');
const GroupController = require('./controller/group.controller');
const { checkUser } = require('./middlewares/user.mw');
const router = Router();

router.post('/user', UserController.createUser);
router.get('/users', UserController.getAllUsers);
router.get('/user/:id', checkUser, UserController.getUser);
router.patch('/user/:id', checkUser, UserController.updateUser);
router.patch('/user-static/:id', UserController.updateStaticUser);
router.delete('/user/:id', UserController.deleteUser);

router.post('/user/:id/task', checkUser, TaskController.createTask);
router.get('/user/:id/tasks', checkUser, TaskController.getUserTasks);
router.get('/user/:id/task/:taskId', checkUser, TaskController.getUserTask);
router.patch(
  '/user/:id/task/:taskId',
  checkUser,
  TaskController.updateUserTask,
);
router.delete(
  '/user/:id/task/:taskId',
  checkUser,
  TaskController.deleteUserTask,
);

router.post('/group', GroupController.createUserGroup);
router.get('/group/:userId', GroupController.getUserGroup);
router.delete('/group/:groupId', GroupController.deleteGroup);

module.exports = router;
