const boom = require("@hapi/boom");

function validatorHandler(schema, property) {
  return (req, _, next) => {
    const data = req[property];
    // abortEarly catch and return all errors instead one of one
    const { error } = schema.validate(data, {abortEarly: false});
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  };
}

module.exports = validatorHandler;
