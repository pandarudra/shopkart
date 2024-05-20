import mongoose from "mongoose";
const schema1 = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: false,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
});
const UserM = mongoose.model("UserM", schema1);
export default UserM;
