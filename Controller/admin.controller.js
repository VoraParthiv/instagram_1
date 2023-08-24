/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const adminSchema = require('../Model/adminSchema');
const { registerValidation, loginValidation } = require('../utils/validation');

// Register
exports.adminRegister = async (req, res) => {
  try {
    const { error, value } = registerValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'Error',
        message: error.details[0].message,
      });
    }
    const passHash = await bcrypt.hash(value.password, 12);
    const newObj = {
      name: value.name,
      email: value.email,
      password: passHash,
    };
    await adminSchema.create(newObj);
    return res.status(200).json({
      status: 'Success',
      message: 'You are successfully register',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

// Login
exports.adminLogin = async (req, res) => {
  try {
    const { error, value } = loginValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'Error',
        message: error.details[0].message,
      });
    }
    const { email, password } = value;
    const admin = await adminSchema.findOne({ email });
    if (admin) {
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (isPasswordValid) {
        const token = jwt.sign({ adminId: admin._id }, process.env.TOKEN_KEY);
        return res.status(200).json({
          status: 'Success',
          data: admin,
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
