const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
const es6Renderer = require("express-es6-template-engine");

// Middle Ware
app.use(express.json());

// Check for sessions and account type
const checkStudentLogin = (req, res, next) => {
  console.log("We need to get here");
  console.log(req.session.user.instructor);
  try {
    if (req.session.user.instructor) {
      next();
    } else {
      // res.json({
      //   message: "Login Required",
      // });
      res.render("home");
    }
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
  const checkTeacherLogin = (req, res, next) => {
    if (!req.session.user.instructor) {
      next();
    } else {
      res.json({
        message: "Login Required",
      });
      res.render("/signin");
    }
  };
};

router.get("/home", checkStudentLogin, (req, res) => {
  console.log("Instructor test in route", req.session.user);
  res.render("studentHome");
});

module.exports = router;
