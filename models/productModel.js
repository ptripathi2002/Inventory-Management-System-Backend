const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    name: {
      type: String,
      required: [true, "Please Add a name"],
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      default: "",
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please add a Category"],
      trim: true,
    },
    quantity: {
      type: String,
      required: [true, "Please Specify the Quantity"],
      trim: true,
    },
    price: {
      type: String,
      required: [true, "Please Specify the Price"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide the Description"],
      trim: true,
    },
    image: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
