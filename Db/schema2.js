import mongoose from "mongoose";
const schema2 = new mongoose.Schema({
  link: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
const ProductM = mongoose.model("ProductM", schema2);
export default ProductM;
