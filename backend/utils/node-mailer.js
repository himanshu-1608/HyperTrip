const nodemailer = require('nodemailer');
const { adminEmail, adminPassword } = require('../config');

const sendEmail = (recieverMail, subject, textMail) => {
  let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: adminEmail,
      pass: adminPassword,
    },
  });

  let mailDetails = {
    from: adminEmail,
    to: recieverMail,
    subject: subject,
    text: textMail,
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log('Error Occurs');
    }
  });
};

exports.sendEmail = sendEmail;
