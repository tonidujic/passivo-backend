exports.parseFromDB = (obj) => {
  const { _id, ...rest } = obj;
  return {
    id: _id,
    ...rest,
  };
};
exports.parseManyFromDB = (arr) => {
  return arr.map((obj) => {
    const { _id, ...rest } = obj;
    return {
      id: _id,
      ...rest,
    };
  });
};
