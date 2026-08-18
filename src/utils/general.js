const catchAsync = require("./catchAsync");

exports.parseFromDB = (obj) => {
  if (!obj) {
    return null;
  }

  const { _id, ...objWithoutId } = obj;

  return {
    id: _id,
    ...objWithoutId,
  };
};

exports.parseManyFromDB = (arr) => {
  if (!Array.isArray(arr)) {
    return [];
  }

  return arr.filter(Boolean).map((obj) => {
    const { _id, ...objWithoutId } = obj;

    return {
      id: _id,
      ...objWithoutId,
    };
  });
};

exports.parseToDB = (obj) => {
  if (!obj) {
    return null;
  }

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
