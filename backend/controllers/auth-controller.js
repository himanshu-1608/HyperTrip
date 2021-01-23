const { findAdminByEmail, createNewAdmin } = require('../utils/db-utils');
const {
  hashPassword,
  createToken,
  checkPassword,
} = require('../utils/auth-utils');
const HttpError = require('../models/http-error');

const signup = async (req, res, next) => {
  const { email, password } = req.body;
  let existingAdmin, hashedPassword, createdAdmin, token;
  try {
    existingAdmin = await findAdminByEmail(email);
    if (existingAdmin) throw new HttpError('Admin exists already', 422);
    hashedPassword = await hashPassword(password);
    createdAdmin = createNewAdmin(email, hashedPassword);
    await createdAdmin.save();
    token = await createToken(createdAdmin.id, createdAdmin.email);
  } catch (err) {
    if (err.code) {
      return next(err);
    }
    return next(new HttpError('Signing up failed, please try again', 500));
  }

  res.status(201).json({
    adminId: createdAdmin.id,
    email: createdAdmin.email,
    token: token,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingAdmin, isValidPassword, token;
  try {
    existingAdmin = await findAdminByEmail(email);
    if (!existingAdmin) throw new HttpError('Invalid credentials', 403);
    isValidPassword = await checkPassword(password, existingAdmin.password);
    if (!isValidPassword) throw new HttpError('Invalid credentials', 403);
    token = createToken(existingAdmin.id, existingAdmin.email);
  } catch (err) {
    if (err.code) {
      return next(err);
    }
    return next(new HttpError('Logging in failed, please try again.', 500));
  }

  res.status(200).json({
    adminId: existingAdmin.id,
    email: existingAdmin.email,
    token: token,
  });
};

exports.signup = signup;
exports.login = login;
