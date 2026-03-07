// const user = await users.insertOne({ username, password });
exports.createUser = async (collection, username, password) => {
  return await collection.insertOne({ username, password });
};

exports.findUserByUsername = async (collection, username) => {
  return await collection.findOne({ username });
};
