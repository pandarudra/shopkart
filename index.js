import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import UserM from "./Db/schema1.js";
import ProductM from "./Db/schema2.js";
import DataM from "./Db/schema3.js";
import sendEmail from "./mail.js";
import { google } from "googleapis";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;
const DB_URL = process.env.MONGO_URI;
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/pdts", async (req, res) => {
  const { link, title, description } = req.body;
  try {
    const pdt = new ProductM({
      link,
      title,
      description,
    });
    await pdt.save();
    res.json(pdt);
  } catch (error) {
    res.json({ message: error });
  }
});
app.get("/pdts", async (req, res) => {
  try {
    const pdts = await ProductM.find();
    res.json(pdts);
  } catch (error) {
    res.json({ message: error });
  }
});

app.get("/register", async (req, res) => {
  try {
    const users = await UserM.find();
    res.json(users);
  } catch (error) {
    res.json({ message: error });
  }
});

app.post("/register", async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const user = new UserM({
      name,
      email,
      phone,
      password,
    });
    sendEmail(email, name)
      .then(() => console.log(`Email successfully sent! TO ${email}`))
      .catch((error) => console.error("Failed to send email:", error));

    await user.save();
    res.json(user);
  } catch (error) {
    res.json({ message: error });
  }
});

app.post("/setup", async (req, res) => {
  const { imglink, role, address, order, money, password } = req.body;
  try {
    const datam = new DataM({
      imglink,
      role,
      order,
      address,
      money,
      password,
    });
    await datam.save();
    res.json(datam);
  } catch (error) {
    res.json({ message: error });
    console.log(error);
  }
});

app.get("/setup", async (req, res) => {
  try {
    const datam = await DataM.find();
    res.json(datam);
  } catch (error) {
    res.json({ message: error });
  }
});

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connected to MongoDB...");
    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}...`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
