const { User } = require('../models');
const createError = require('http-errors');

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const createdUser = await User.create(body);
    if (!createdUser) {
      const err = createError(400, 'Bad request. User was not created');
      return next(err);
    }
    res.status(201).send({ data: createdUser });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const {
      query: { page = 1, size = 10 },
    } = req;
    if (page < 1 || size < 1) {
      const err = createError(400, 'Bad request. Pagination is invalid');
      return next(err);
    }
    const { count: total, rows: users } = await User.findAndCountAll({
      attributer: {
        exclide: ['password'],
      },
      limit: size,
      offset: (page - 1) * size,
    });
    res.status(200).send({
      usersCount: total,
      pagesCount: `${Math.ceil(total / size)}`,
      pageSize: size,
      currentPage: page,
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const { userInstance } = req;
    userInstance.password = undefined;
    res.status(200).send({ data: userInstance });
  } catch (err) {
    next(err);
  }
};

module.exports.updateStaticUser = async (req, res, next) => {
  try {
    const {
      body,
      params: { id },
    } = req;
    const [rowsCount, [updatedUser]] = await User.update(body, {
      where: { id },
      returning: true,
    });
    if (rowsCount !== 1) {
      const err = createError(400, 'Bad request. User was not updated');
      return next(err);
    }
    updatedUser.password = undefined;
    res.status(202).send({ data: updatedUser });
  } catch (err) {
    next(err);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const { body, userInstance } = req;
    updatedUserInstance = await userInstance.update(body, { returning: true });
    if (!updatedUserInstance) {
      const err = createError(400, 'Bad request. User was not updated');
      return next(err);
    }
    updatedUser.password = undefined;
    res.status(202).send({ data: updatedUserInstance });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const userToDelete = await User.findByPk(id);
    if (!userToDelete) {
      const err = createError(400, 'Bad request. User was not removed');
      return next(err);
    }
    const result = await userToDelete.destroy();
    updatedUser.password = undefined;
    res.status(202).send({ data: userToDelete });
  } catch (err) {
    next(err);
  }
};
