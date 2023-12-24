const nodemailer = require("nodemailer");

const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465 ,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "ecommerce.www.12@gmail.com",
    pass: "xsxzojuneppqkjxm",
  },
});

  const mailOptions = {
    from: "ecommerce.www.12@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.text,
    html: options.message
  }

  await transporter.sendMail(mailOptions)
}

module.exports = sendMail;