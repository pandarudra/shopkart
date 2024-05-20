import mongoose from "mongoose";
const indiData = new mongoose.Schema({
  imglink: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: false,
  },
  money: {
    type: Number,
    required: false,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
});
const DataM = mongoose.model("DataM", indiData);
export default DataM;
