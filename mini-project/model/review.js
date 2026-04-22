const mongoose = require("mongoose");
const { type } = require("node:os");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  passenger: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  driver: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  booking: {
    type: Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});
