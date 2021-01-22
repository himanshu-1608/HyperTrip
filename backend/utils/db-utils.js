const Admin = require('../models/admin');
const HttpError = require('../models/http-error');

const createNewAdmin = (email, password) => {
  let admin;
  admin = new Admin({
    email,
    password,
  });
  return admin;
};

const findAdminById = async (adminId) => {
  let admin;
  admin = await Admin.findById(adminId);
  if (!admin) {
    const error = new HttpError(
      'Could not find admin for the provided id.',
      404
    );
    throw error;
  }
  return admin;
};

const findAdminByEmail = async (adminMail) => {
  let admin;
  admin = await Admin.findOne({ email: adminMail });
  return admin;
};

exports.createNewAdmin = createNewAdmin;
exports.findAdminById = findAdminById;
exports.findAdminByEmail = findAdminByEmail;
