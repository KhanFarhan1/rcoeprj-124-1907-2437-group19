//model
const ride = require("../model/ride");

module.exports.getDriverRides = async (req, res, next) => {
  //let specfic_ride = await ride.find({driver = req.user._id});
  let specfic_ride = await ride
    .find({ driver: req.user._id })
    .populate("driver");
  //console.log(specfic_ride);
  res.render("rider/ride_status", { specfic_ride });
};

module.exports.renderEditRideForm = async (req, res) => {
  let { id } = req.params;
  let ride_data = await ride.findById(id);
  console.log("Edit Request of a ride :", ride_data);
  res.render("rider/ride_editform.ejs", { ride_data });
};

module.exports.updateRide = async (req, res) => {
  let {
    pickup_location,
    destination,
    departure_date_time,
    seat,
    price,
    car_type,
  } = req.body;
  let { id } = req.params;
  let updated_user = await ride.findByIdAndUpdate(
    id,
    {
      pickup_location,
      destination,
      departure_date_time,
      seat,
      price,
      car_type,
    },
    { new: true },
  );

  console.log("Update:", updated_user);
  req.flash("success", `All changes saved successfully`);
  res.redirect("/ridestatus");
};

module.exports.deleteRide = async (req, res, next) => {
  let { id } = req.params;
  let deletedride = await ride.findByIdAndDelete(id);
  console.log("Deleted Sucessfully", deletedride);
  req.flash("success", `Ride Deleted Successfully`);
  res.redirect("/ridestatus");
};
