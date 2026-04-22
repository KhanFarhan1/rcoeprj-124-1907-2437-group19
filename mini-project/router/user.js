const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controller/user");

//login-route
router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    userController.loginUser,
  );
//log-out
router.get("/logout", userController.logoutUser);

//signup-route
router
  .route("/signup")
  .get(userController.renderSignupForm)
  .post(userController.registerUser);

module.exports = router;
