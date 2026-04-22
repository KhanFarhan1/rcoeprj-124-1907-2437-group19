const mongoose = require("mongoose");
const { type } = require("node:os");
const Schema = mongoose.Schema;
const rideSchema = new Schema(
  {
    driver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pickup_location: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    departure_date_time: {
      type: Date,
      validate: {
        validator: function (value) {
          return value > new Date();
        },
        message: "Departure time must be in the future.",
      },
      required: true,
    },
    seat: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    car_type: {
      type: String,
      enum: ["ac", "non-ac"],
      required: true,
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model("Ride", rideSchema);
