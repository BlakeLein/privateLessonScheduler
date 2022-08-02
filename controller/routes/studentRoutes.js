const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
const es6Renderer = require("express-es6-template-engine");

// Middle Ware
app.use(express.json());

// Check for sessions and account type
const checkStudentLogin = (req, res, next) => {
  try {
    if (req.session.user.instructor) {
      next();
    } else if (req.session.user) {
      res.render("instructorHome");
    }
  } catch (error) {
    res.render("home");
  }
};

router.get("/home", checkStudentLogin, (req, res) => {
  console.log("Instructor test in route", req.session.user);
  res.render("studentHome");
});

module.exports = router;
