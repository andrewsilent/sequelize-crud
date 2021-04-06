const { User } = require('../models');
const createError = require('http-errors');

module.exports.checkUser = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const userInstance = await User.findByPk(id);
    if (!userInstance) {
      const err = createError(404,'User not found');
      return next(err);
    }
    req.userInstance = userInstance;
    next();
  } catch (err) {
    next(err);
  }
};
