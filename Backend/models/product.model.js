const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    actual_price: {
      type: Number,
      required: true,
    },
    selling_price: {
      type: Number,
      required: true,
    },
    productNo: {
      type: String,
      required: true,
    },
    profit: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    total_quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "category",
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
    autoCreate: true,
  }
);

const product = new mongoose.model("product", productSchema, "product");
module.exports = product;
