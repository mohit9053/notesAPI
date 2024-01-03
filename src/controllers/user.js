const User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    const {
      username,
      password
    } = req.body;

    // Check if the username is already taken
    const existingUser = await User.findOne({
      username
    });
    if (existingUser) {
      return res.status(400).json({
        message: 'Username is already taken'
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword
    });
    await newUser.save();

    return res.status(201).json({
      message: 'User registered successfully'
    });
  } catch (error) {
    next(error);
  }
}

const login = async (req, res, next) => {
  try {
    const {
      username,
      password
    } = req.body;

    const user = await User.findOne({
      username
    });
    if (!user) {
      return res.status(401).json({
        message: 'Invalid username or password'
      });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid username or password'
      });
    }

    // Generate a JWT token
    const token = jwt.sign({
      userId: user._id,
      username: user.username
    }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });

    return res.status(200).json({
      token
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login
};