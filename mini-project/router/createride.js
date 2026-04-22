const express = require("express");
const router = express.Router();
const { isDriver, isloggedin } = require("../middleware.js");

const createrideController = require("../controller/createride.js");

router
  .route("/")
  .get(isloggedin, isDriver, createrideController.renderRideForm)
  .post(isloggedin, createrideController.createRide);

module.exports = router;
