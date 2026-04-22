const express = require("express");
const router = express.Router();
const {
  isloggedin,
  ispassenger,
  isAlreadyBooked,
  isOwner_Booking,
} = require("../middleware.js");
const BookingController = require("../controller/booking.js");

router
  .route("/:id")
  .get(isloggedin, ispassenger, BookingController.renderBookingForm)
  .post(
    isloggedin,
    ispassenger,
    isAlreadyBooked,
    BookingController.createBooking,
  );

router.delete(
  "/cancel/:id",
  isloggedin,
  ispassenger,
  isOwner_Booking,
  BookingController.cancelBooking,
);

module.exports = router;
