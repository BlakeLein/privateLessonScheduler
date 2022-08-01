const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
const es6Renderer = require("express-es6-template-engine");

// Middle Ware
app.use(express.json());

// Check for sessions and account type
const checkStudentLogin = (req, res, next) => {
  if (req.session.user.instructor) {
    next();
  } else {
    res.json({
      message: "Login Required",
    });
    res.render("/signin");
  }
};
const checkTeacherLogin = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.json({
      message: "Login Required",
    });
    res.render("/signin");
  }
};

router.get("/home", checkStudentLogin, (req, res) => {
  res.render("studentHome");
});

module.exports = router;
