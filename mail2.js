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
async function Mailer(to, name) {
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
      subject: "Welcome Back to Shopcart!",
      text: `Hello ${name}! Welcome back to ShopKart! We're thrilled to see you again. Enjoy your shopping experience!`,
      html: `
          <h1>Welcome Back to Shopcart, ${name}!</h1>
          <p>We're thrilled to see you again. Here's to another great shopping experience!</p>
          <p>Remember, if you need any assistance, we're here to help. Happy shopping!</p>
          <p>Best regards,</p>
          <p>The Shopcart Team</p>
        `,
    };
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

export default Mailer;
