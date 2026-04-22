//model
const book = require("../model/book");

module.exports.booked = async (req, res) => {
  let status = req.query.status;
  let currUserID = req.user._id;
  let currTime = new Date();
  let booked_ride = await book
    .find({ passenger: currUserID })
    .populate({
      path: "ride_detail",
      populate: {
        path: "driver",
      },
    })
    .populate("passenger");
  if (booked_ride.length === 0) {
    return res.send("No Booking Yet!!");
  }

  for (let i = 0; i < booked_ride.length; i++) {
    if (
      booked_ride[i].ride_detail.departure_date_time < currTime &&
      booked_ride[i].status === "active"
    ) {
      booked_ride[i].status = "completed";
      await booked_ride[i].save();
    }
  }
  console.log("There is your Booked Ride --->", booked_ride);
  if (status === "active") {
    res.render("book/booked_ride", { booked_ride });
  }
  if (status === "completed") {
    res.render("book/completed_booked_ride", { booked_ride });
  }
  if (status === "cancelled") {
    res.render("book/cancelled_booked_ride", { booked_ride });
  }
};
