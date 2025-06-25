module.exports = function errorHandler(err, req, res, next) {
  console.log(err);
  switch (err.name) {
    // case value:
    //   break;
    default:
      res.status(500).json({ message: 'Internal server error' });
      break;
  }
};
