const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const placeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    type: {
      type: String,
      enum: ["coffee", "shop", "bookstore"]
    },
    location: { type: { type: String }, coordinates: [Number] }
  },
  { timestamps: true }
);

const Place = mongoose.model("Place", placeSchema);
module.exports = Place;
