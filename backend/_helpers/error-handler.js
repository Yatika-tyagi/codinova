module.exports = errorHandler;

function errorHandler(err, req, res, next) {
  var result;
  switch (err) {
    case typeof err === 'string':
      // custom application error
      result = res.status(400).json({ message: err });
      break;

    case err.name === 'ValidationError':
      // mongoose validation error
      result = res.status(400).json({ message: err.message });
      break;

    case err.name === 'UnauthorizedError':
      // jwt authentication error
      result = res.status(401).json({ message: 'Invalid Token' });
      break;

    // default to 500 server error
    default:
      result = res.status(500).json({ message: err });
      break;
  }
  return result;
}
