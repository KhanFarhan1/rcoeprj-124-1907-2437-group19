const ride = require("../model/ride");

module.exports.renderRideForm = (req, res) => {
  res.render("rider/ride_form.ejs");
};
module.exports.createRide = async (req, res) => {
  let {
    pickup_location,
    destination,
    departure_date_time,
    seat,
    price,
    car_type,
  } = req.body;
  let driver = req.user._id;
  let newride = new ride({
    driver: driver,
    pickup_location: pickup_location,
    destination: destination,
    departure_date_time: departure_date_time,
    seat: seat,
    price: price,
    car_type: car_type,
  });
  let registeredride = await newride.save();
  console.log("New Ride is created:", registeredride);
  req.flash("success", `Ride Listing is create, Successfully`);
  res.redirect("/");
};
