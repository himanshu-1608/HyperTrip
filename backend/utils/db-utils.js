const User = require('../models/user');
const HttpError = require('../models/http-error');

const createNewUser = async (name, email, password) => {
  let user;
  user = User({
    name,
    email,
    password,
    imageUrl: 'uploads/images/new-user.png',
    tickets: [],
  });
  return user;
};

const findUserById = async (userId) => {
  let user;
  user = await User.findById(userId);
  if (!user) {
    const error = new HttpError(
      'Could not find user for the provided id.',
      404
    );
    throw error;
  }
  return user;
};

const findUserByName = async (userName) => {
  let user;
  user = await User.findOne({ name: userName });
  if (!user) {
    const error = new HttpError(
      'Could not find user for the provided id.',
      404
    );
    throw error;
  }
  return user;
};

const findUserByEmail = async (userMail) => {
  let user;
  user = await User.findOne({ email: userMail });
  return user;
};

exports.createNewUser = createNewUser;
exports.findUserById = findUserById;
exports.findUserByName = findUserByName;
exports.findUserByEmail = findUserByEmail;
