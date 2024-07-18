const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    // Create a Transporter to send emails
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    // Send emails to users
    let info = await transporter.sendMail({
      from: '"EcomSphere🛒" ecomsphere@gmail.com',
      to: email,
      subject: title,
      html: body,
    });
    // console.log("Email info: ", info);
    return info;
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = mailSender;
