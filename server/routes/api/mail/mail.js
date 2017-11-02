var express = require('express');
var router = express.Router();

router.post('/company', function (req, res) {
  const nodemailer = require('nodemailer');
  const email = req.body.email;
  const company = req.body.company;
  const quiry = req.body.quiry;
  const subject = req.body.subject;

  console.log(req.body);

  nodemailer.createTestAccount((err, account) => {

    const transporter = nodemailer.createTransport({
      host: 'smtp.daum.net',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'factory.info',
        pass: 'Ycombinator2017'
      }
    });

  const mailOptions = {
    from: 'info@factoryhunt.com', // sender address
    to: 'info@factoryhunt.com', // list of receivers
    subject: '[Factory Hunt] ' + subject,
    // text: 'Sender: ' + fromEmail, // plain text body
    html:
    '<h2>Email</h2>' +
    email +
    '<br><br>' +
    '<h2>Company</h2>' +
    company +
    '<br><br>' +
    '<h2>Message</h2>' +
    quiry
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('mail sent success!')
});
});

  res.send('1')
});

router.post('/product', function (req, res) {
  const nodemailer = require('nodemailer');
  const email = req.body.email;
  const company = req.body.company;
  const product = req.body.product;
  const product_id = req.body.pid;
  const quiry = req.body.quiry;
  const subject = req.body.subject;

  console.log(req.body);

  nodemailer.createTestAccount((err, account) => {

    const transporter = nodemailer.createTransport({
      host: 'smtp.daum.net',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'factory.info',
        pass: 'Ycombinator2017'
      }
    });

  const mailOptions = {
    from: 'info@factoryhunt.com', // sender address
    to: 'info@factoryhunt.com', // list of receivers
    subject: '[Factory Hunt] ' + subject,
    // text: 'Sender: ' + fromEmail, // plain text body
    html:
    '<h2>Email</h2>' +
    email +
    '<br><br>' +
    '<h2>Company</h2>' +
    company +
    '<br><br>' +
    '<h2>Product' + ' (' + product_id + ')' + '</h2>' +
    product +
    '<br><br>' +
    '<h2>Message</h2>' +
    quiry
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('mail sent success!')
});
});

  res.send('1')
});

router.post('/contact', function (req, res) {
  const nodemailer = require('nodemailer');
  const email = req.body.email;
  const quiry = req.body.quiry;
  const subject = req.body.subject;

  console.log(req.body);

  nodemailer.createTestAccount((err, account) => {

    const transporter = nodemailer.createTransport({
      host: 'smtp.daum.net',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'factory.info',
        pass: 'Ycombinator2017'
      }
    });

  const mailOptions = {
    from: 'info@factoryhunt.com', // sender address
    to: 'info@factoryhunt.com', // list of receivers
    subject: '[Factory Hunt] ' + subject,
    // text: 'Sender: ' + fromEmail, // plain text body
    html:
    '<h2>Email</h2>' +
    email +
    '<br><br>' +
    '<h2>Message</h2>' +
    quiry
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('mail sent success!')
});
});

  res.send('1')
});

module.exports = router;