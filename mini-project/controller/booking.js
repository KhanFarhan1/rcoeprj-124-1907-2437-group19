//model
const ride = require("../model/ride");
const book = require("../model/book");

module.exports.renderBookingForm = async (req, res) => {
  let { id } = req.params;
  let ride_data = await ride.findById(id).populate("driver");
  res.render("book/booking_form", { ride_data });
};

module.exports.createBooking = async (req, res) => {
  let { id } = req.params;
  let ride_data = await ride.findById(id);
  let Currseat = ride_data.seat;
  let { seat_booked, total_cost, payment_mode } = req.body;
  seat_booked = Number(seat_booked);
  if (seat_booked > Currseat) {
    return res.send("Seats not available");
  } else {
    await ride.findByIdAndUpdate(id, { $inc: { seat: -seat_booked } });
    let currUserID = req.user._id;
    let newbook = new book({
      ride_detail: id,
      passenger: currUserID,
      seat_booked: seat_booked,
      total_cost: total_cost,
      payment_mode: payment_mode,
    });
    let registeredbooking = await newbook.save();
    console.log("New Booking", registeredbooking);
    req.flash("success", `Booking confirmed!!`);
    res.redirect("/");
  }
};

module.exports.cancelBooking = async (req, res) => {
  let { id } = req.params;

  // 1. Find booking first
  let booking = await book.findById(id);

  if (!booking) {
    return res.send("Booking not found");
  }

  // 2. Prevent double cancel
  if (booking.status === "cancelled") {
    return res.redirect("/bookedrides");
  }

  // 3. Update ride seats
  await ride.findByIdAndUpdate(booking.ride_detail, {
    $inc: { seat: booking.seat_booked },
  });

  // 4. Update booking status
  booking.status = "cancelled";
  await booking.save();

  // 5. Redirect
  req.flash("success", `Booking cancelled successfully!!`);
  res.redirect("/");
};
