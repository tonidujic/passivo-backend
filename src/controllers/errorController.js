const { ZodError } = require("zod");
const AppError = require("../utils/appError");

const handleDuplicateFieldsDB = (err) => {
  const value = Object.values(err.keyValue)[0];
  const message = `Duplicate field value : ${value} , please use another value`;
  return new AppError(message, 400);
};

const handleZodError = (err) => {
  const errors = err.issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));
  const appError = new AppError("Validation failed", 400);
  appError.errors = errors;
  return appError;
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (err.code === 11000) err = handleDuplicateFieldsDB(err);
  if (err instanceof ZodError) err = handleZodError(err);
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
