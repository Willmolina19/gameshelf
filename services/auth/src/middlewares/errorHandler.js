export function errorHandler(error, req, res, next) {
  console.error(error);

  if (error.number === 2627 || error.number === 2601) {
    return res.status(409).json({
      message: "Ya existe un registro con esos datos",
    });
  }

  const status = error.status || 500;

  return res.status(status).json({
    message:
      status === 500
        ? "Error interno del servidor"
        : error.message,
  });
}