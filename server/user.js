const mongoose = require("mongoose");

const userschema = mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    phone: { type: String }, // Add phone field
    selectedBatch: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userschema);
