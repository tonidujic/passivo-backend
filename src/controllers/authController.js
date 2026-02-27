const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  const token = req.cookies?.jwt;

  if (!token) {
    return res.status(401).json({ message: "You are not logged in" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

exports.protectedInfo = (req, res) => {
  res.status(200).json({ message: "Info" });
};
