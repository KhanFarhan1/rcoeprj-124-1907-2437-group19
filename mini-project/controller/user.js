//model
const user = require("../model/user");

module.exports.renderLoginForm = async (req, res) => {
  res.render("user/login.ejs");
};

module.exports.loginUser = async (req, res) => {
  req.flash("success", `Welcome back! You've logged in successfully`);
  res.redirect("/");
  //console.log(req.user);
};

module.exports.logoutUser = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", `You've been safely signed out`);
    res.redirect("/");
  });
};

module.exports.renderSignupForm = async (req, res) => {
  res.render("user/signup.ejs");
};

module.exports.registerUser = async (req, res) => {
  let { name, phone_number, email, role, username, password } = req.body;
  //console.log(name, phone_number, email, role, username, password);
  let newUser = new user({
    name: name,
    phone_number: phone_number,
    email: email,
    role: role,
    username: username,
  });
  let registereduser = await user.register(newUser, password);
  req.login(registereduser, (err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", `Account created. Welcome!`);
    res.redirect("/");
  });
  //console.log(registereduser);
};
