exports.parseFromDB = (doc) => {
  const { _id, ...rest } = doc;
  return { id: _id, ...rest };
};
