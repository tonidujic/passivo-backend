exports.createPassword = async (
  collection,
  userId,
  title,
  username,
  website
) => {
  return await collection.insertOne({
    userId,
    title,
    username,
    password,
    website,
  });
};

exports.findPasswordById = async (collection, id, userId) => {
  return await collection.findOne({ _id: id, userId });
};

exports.getAllPasswords = async (collection, userId) => {
  return await collection.find({ userId }).toArray();
};

exports.updatePassword = async (collection, id, password) => {
  return await collection.updateOne(
    {
      _id: id,
      userId,
    },
    {
      $set: { password },
    }
  );
};

exports.deleteOnePassword = async (collection, id) => {
  return await collection.deleteOne({
    _id: id,
    userId,
  });
};

exports.deleteAllPasswords = async (collection, id) => {
  return await collection.deleteMany({ _id: id, userId });
};
