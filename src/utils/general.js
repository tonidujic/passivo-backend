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
