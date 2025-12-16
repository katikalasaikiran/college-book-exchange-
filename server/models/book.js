const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    condition: { type: String, required: true }, // e.g., "New", "Used - Good"
    description: { type: String },
    contactPhone: { type: String, required: true }, // For calling
    contactEmail: { type: String }, // For emailing
    image: { type: String }, // URL of the image

    // 👇 THIS IS THE NEW FIELD WE ADDED
    isSold: { type: Boolean, default: false },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
