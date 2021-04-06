const { Router } = require('express');
const UserController = require('../controller/user.controller');
const { checkUser } = require('../middlewares/user.mw');
const userRouter = Router();

userRouter.post('/user', UserController.createUser);
userRouter.get('/users', UserController.getAllUsers);
userRouter.get('/user/:id', checkUser, UserController.getUser);
userRouter.patch('/user/:id', checkUser, UserController.updateUser);
userRouter.patch('/user-static/:id', UserController.updateStaticUser);
userRouter.delete('/user/:id', UserController.deleteUser);

module.exports = userRouter;