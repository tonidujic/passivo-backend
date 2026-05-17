const catchAsync = require("./catchAsync");

exports.parseFromDB = (obj) => {
  const { _id, ...objWithoutId } = obj;
  return {
    id: _id,
    ...objWithoutId,
  };
};
exports.parseManyFromDB = (arr) => {
  return arr.map((obj) => {
    const { _id, ...objWithoutId } = obj;
    return {
      id: _id,
      ...objWithoutId,
    };
  });
};

exports.parseToDB = (obj) => {
  const { id, ...objWithoutId } = obj;
  return {
    _id: id,
    ...objWithoutId,
  };
};

exports.validate = (validator) => {
  return (req, res, next) => {
    const parsed = validator.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        status: "fail",

        message: "Validation failed",

        errors: parsed.error.flatten().fieldErrors,
      });
    }
    req.body = parsed.data;
    next();
  };
};
