const jwt = require("jsonwebtoken");
const User = require("../models/User")


const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization").split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "Authorization token is missing" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(decoded.userId);


    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "Invalid error" });
  }
};

module.exports = authenticateUser;
