const nodemailer = require('nodemailer');

const defaultHost = '';
const defaultSender = '';
const senderPass = '';

 module.exports.self = function send(message) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.yandex.ru',
      port: 587,
      secure: false,  // true for 465, false for other ports
      auth: {
          user: defaultSender,  // generated ethereal user
          pass: senderPass      // generated ethereal password
      }
    });

  // send mail with defined transport object
  transporter.sendMail({
      from: defaultSender,  // sender address
      to: defaultHost,      // list of receivers
      subject: 'Test',      // Subject line
      text: message        // plain text body
  });
}