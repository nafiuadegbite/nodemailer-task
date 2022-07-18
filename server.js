const express = require("express");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();

const app = express();
const port = 3000;

const config = {
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN,
  accessToken: process.env.ACCESS_TOKEN,
  redirectUri: process.env.REDIRECT_URI,
  senderMail: process.env.SENDER_MAIL,
  recipient: process.env.RECIPIENT_MAIL,
};

const oAuth2Client = new google.auth.OAuth2(
  config.clientId,
  config.clientSecret,
  config.redirectUri
);

oAuth2Client.setCredentials({ refresh_token: config.refreshToken });

const sendMail = async () => {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: config.senderMail,
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        refreshToken: config.refreshToken,
        accessToken: config.accessToken,
      },
    });

    const mailOptions = {
      from: "Nafiu Adegbite <config.senderEmail>",
      to: config.recipient,
      subject: "Zuri Task",
      text: "This is a zuri task",
    };

    const result = transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
};

sendMail()
  .then((result) => console.log(`Email sent...`, result))
  .catch((error) => console.log(error));

app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`);
});
