const mongoose = require("mongoose");
const Ride = require("../model/ride");
const rides = require("./ridesData");

mongoose.connect("mongodb://127.0.0.1:27017/mini-project").then(async () => {
  await Ride.deleteMany({});
  await Ride.insertMany(rides);
  console.log("Ride data inserted successfully 🚗");
  mongoose.connection.close();
});
