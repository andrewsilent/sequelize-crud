const { Router } = require('express');
const UserController = require('./controller/user.controller');
const TaskController = require('./controller/task.controller');
const router = Router();

// router.use('/', (req, res, next) => {
//   console.log('Time:', Date.now());
//   next();
// });

/*
  GET http://localhost:3001/api
*/
router.get('/', (req, res, next) => {
  res.status(200).send('ok');
});

/*
  GET http://localhost:3001/api/test
*/
router.get('/test', (req, res, next) => {
  res.status(200).send('ok test');
});

router.post('/user', UserController.createUser);

router.get('/users', UserController.getAllUsers);

router.post('/user/:id/task', TaskController.createTask);

module.exports = router;
