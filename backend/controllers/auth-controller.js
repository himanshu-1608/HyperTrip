const { findAdminByEmail, createNewAdmin } = require('../utils/db-utils');
const {
  hashPassword,
  createToken,
  checkPassword,
} = require('../utils/auth-utils');
const HttpError = require('../models/http-error');

const signup = async (req, res, next) => {
  const { email, password } = req.body;
  let existingAdmin;
  try {
    existingAdmin = await findAdminByEmail(email);
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }
  if (existingAdmin) {
    const error = new HttpError(
      'Admin exists already, please assign another email instead.',
      422
    );
    return next(error);
  }

  let hashedPassword, createdAdmin, token;
  try {
    hashedPassword = await hashPassword(password);
    createdAdmin = createNewAdmin(email, hashedPassword);
    await createdAdmin.save();
    token = await createToken(createdAdmin.id, createdAdmin.email);
  } catch (err) {
    const error = new HttpError(
      'Could not create admin, please try again.',
      500
    );
    return next(error);
  }
  res.status(201).json({
    adminId: createdAdmin.id,
    email: createdAdmin.email,
    token: token,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingAdmin;
  try {
    existingAdmin = await findAdminByEmail(email);
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!existingAdmin) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      403
    );
    return next(error);
  }

  let isValidPassword;
  try {
    isValidPassword = await checkPassword(password, existingAdmin.password);
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      403
    );
    return next(error);
  }

  let token;
  try {
    token = createToken(existingAdmin.id, existingAdmin.email);
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  res.status(200).json({
    adminId: existingAdmin.id,
    email: existingAdmin.email,
    token: token,
  });
};

exports.signup = signup;
exports.login = login;
