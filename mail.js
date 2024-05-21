import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.URL
);
oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});
async function sendEmail(to, name) {
  try {
    const accessToken = await oauth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: to,
      subject: "Welcome to Shopcart!",
      text: `Hello ${name}! Welcome to ShopKart!`,
      html: ` <h1>Welcome to Shopcart!</h1>
      <p>Dear Customer,</p>
      <p>We're excited to have you on board. Thank you for registering at our shop!</p>
      <p>Start your amazing shopping experience right now and let us know if you need any assistance.</p>
      <p>Happy shopping!</p>
      <p>Best regards,</p>
      <p>The Shopcart Team</p>`,
    };
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

export default sendEmail;
