module.exports.isloggedin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
};

module.exports.isDriver = (req, res, next) => {
  if (req.user && req.user.role === "driver") {
    return next();
  }
  res.send("Access Denied!!");
};

module.exports.ispassenger = (req, res, next) => {
  if (req.user && req.user.role === "passenger") {
    return next();
  }
  res.send("Access Denied!!");
};
const ride = require("./model/ride");
module.exports.isCreater_ride = async (req, res, next) => {
  let { id } = req.params;
  let ride_data = await ride.findById(id);
  if (req.user && ride_data.driver.equals(req.user._id)) {
    return next();
  } else {
    res.send("Access Denied!!!");
  }
};

const book = require("./model/book");
module.exports.isAlreadyBooked = async (req, res, next) => {
  let existingride = await book.findOne({
    passenger: req.user._id,
    status: "active",
  });
  if (existingride) {
    return res.send(
      "You already have an active ride booking. Please complete or cancel it before booking another ride.",
    );
  }
  next();
};

module.exports.isOwner_Booking = async (req, res, next) => {
  let { id } = req.params;
  let booked_data = await book.findById(id);
  if (!booked_data) {
    return res.send("Booking not found");
  }
  if (req.user && booked_data.passenger.equals(req.user._id)) {
    return next();
  }
  res.send("Access Denied");
};
