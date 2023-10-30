const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

module.exports.sendEmail = ({
  to,
  subject,
  content,
  from = "todoapp@poneyhost.eu",
}) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport(
      smtpTransport({
        host: "mail.poneyhost.eu",
        port: "587",
        auth: {
          user: "todoapp@poneyhost.eu",
          pass: "toneamer92",
        },
      })
    );

    const mailOptions = {
      from,
      to,
      subject,
      text: content,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(`Unable to send email to ${to} [${error.message}]`);
        return reject(error.message);
      }

      console.log(`Email successfully sent to ${to} [${info.messageId}]`);
      return resolve();
    });
  });
};
