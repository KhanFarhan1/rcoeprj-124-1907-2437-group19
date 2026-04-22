const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  ride_detail: {
    type: Schema.Types.ObjectId,
    ref: "Ride",
    required: true,
  },

  passenger: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  total_cost: {
    type: Number,
    required: true,
  },
  seat_booked: {
    type: Number,
    min: 1,
    required: true,
  },

  payment_mode: {
    type: String,
    enum: ["cash", "online"],
    required: true,
  },

  booking_date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["active", "completed", "cancelled"],
    default: "active",
  },
});

module.exports = mongoose.model("Booking", BookSchema);
