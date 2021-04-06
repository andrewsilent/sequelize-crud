module.exports = async (req, res, next) => {
  try {
    const {
      query: { page, size },
    } = req;
    req.pagination = {
      limit: size <= 0 || size > 100 ? 10 : size,
      offset: page <= 0 ? 0 : (page - 1) * size,
    };
    next();
  } catch (err) {
    next(err);
  }
};
