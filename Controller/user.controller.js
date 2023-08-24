/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const userSchema = require('../Model/userSchema');
const { registerValidation, loginValidation } = require('../utils/validation');

// Register
exports.userRegister = async (req, res) => {
  try {
    const { error, value } = registerValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'Error',
        message: error.details[0].message,
      });
    }
    const userExist = await userSchema.findOne({ name: value.name });
    if (!userExist) {
      const passHash = await bcrypt.hash(value.password, 12);
      const newUser = {
        name: value.name,
        email: value.email,
        contact: value.contact,
        password: passHash,
      };
      const data = await userSchema.create(newUser);
      return res.status(200).json({
        status: 'Success',
        message: 'You have been successfully registered',
        data,
      });
    }
    return res.status(409).json({
      status: 'Warning',
      message: 'You are already register',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

// Login
exports.userLogin = async (req, res) => {
  try {
    const { error, value } = loginValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'Error',
        message: error.details[0].message,
      });
    }
    const { email, password } = value;
    const user = await userSchema.findOne({ email });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const token = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY);
        return res.status(200).json({
          status: 'Success',
          data: user,
          message: 'You have been successfully logged in',
          token,
        });
      }
      return res.status(400).json({
        status: 'Error',
        message: 'Invalid password',
      });
    }
    return res.status(400).json({
      status: 'Error',
      message: 'Invalid email',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

// Profile Update
exports.userProfileUpdate = async (req, res) => {
  try {
    await userSchema.updateOne(
      { _id: { $eq: new mongoose.Types.ObjectId(req.params.userId) } },
      { $set: { profile: req.body.profile } },
    );
    return res.status(200).json({
      status: 'Success',
      message: 'Your profile are successfully updated...!',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

exports.tokenVerify = async (req, res) => {
  try {
    return res.status(200).json({
      status: 'Success',
      message: 'Authentication success',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};
