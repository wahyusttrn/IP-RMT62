module.exports = function errorHandler(err, req, res, next) {
  switch (err.name) {
    case 'SequelizeValidationError':
    case 'Bad Request':
    case 'SequelizeUniqueConstraintError':
      res.status(400).json({ message: err.message });
      break;
    case 'Unauthorized':
      res.status(401).json({ message: err.message });
      break;
    case 'JsonWebTokenError':
      res.status(401).json({ message: 'Invalid Token' });
      break;
    case 'Forbidden':
      res.status(403).json({ message: 'Forbidden Access' });
      break;
    case 'Not Found':
      res.status(404).json({ message: err.message });
      break;
    default:
      res.status(500).json({ message: 'Internal Server Error' });
      break;
  }
};
