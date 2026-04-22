const express = require("express");
const router = express.Router();

const { isDriver, isloggedin, isCreater_ride } = require("../middleware.js");

const ridestatusController = require("../controller/ridestatus.js");

//ride_status
router.get("/", isloggedin, isDriver, ridestatusController.getDriverRides);

//ride_status_edit
router
  .route("/edit/:id")
  .get(
    isloggedin,
    isDriver,
    isCreater_ride,
    ridestatusController.renderEditRideForm,
  )
  .put(isloggedin, isDriver, isCreater_ride, ridestatusController.updateRide);
//
//ridestatus-delete
router.delete(
  "/delete/:id",
  isloggedin,
  isDriver,
  isCreater_ride,
  ridestatusController.deleteRide,
);

module.exports = router;
