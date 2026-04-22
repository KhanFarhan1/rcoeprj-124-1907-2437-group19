const express = require("express");
const router = express.Router();
const { isloggedin, ispassenger } = require("../middleware.js");
const BookedController = require("../controller/bookedrides.js");
//bookedride (Active Book Page)
router.get("/", isloggedin, ispassenger, BookedController.booked);
module.exports = router;
