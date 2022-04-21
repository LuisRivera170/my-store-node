/*
 * Un middleware es una funcion con los parámetros (err, req, res, next)
 * Si el middleware trae el parámetro err es un middleware de tipo error
 */
function logErrors(err, req, res, next) {
  // Este middleware de ejemplo solo muestra el error en servidor para poder monitorearlo
  console.error(err);
  // Con next continuamos al siguiente middleware de la cadena
  next(err);
}

/*
 * Middleware con respuesta personalizada del error para devolverlo
 * al cliente que se complementa con la función anterior:
 */

function errorHandler(err, req, res, next) {
  // Respuesta de error personalizada
  res
    .status(500)
    .json({
      message: err.message,
      stack: err.stack
    });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res
      .status(output.statusCode)
      .json(output.payload);
    return;
  }
  next(err);
}

module.exports = { logErrors, errorHandler, boomErrorHandler };
