// Server Imports
const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
const es6Renderer = require("express-es6-template-engine");
const bcrypt = require("bcrypt");
const models = require("../../sequelize/models");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const store = new SequelizeStore({
  db: models.sequelize,
});

// Import Modals
const { Students } = require("../../sequelize/models");
const { Instructors } = require("../../sequelize/models");
const { Lessons } = require("../../sequelize/models");
const { response } = require("express");

// Middle Ware
app.use(express.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    store: store,
  })
);
store.sync();

// Check for sessions and account type
const detectUser = (req, res, next) => {
  if (req.session.user.instructor) {
    res.render("studentHome");
  } else if (req.session.user) {
    res.render("instructorHome");
  } else {
    next();
  }
};

// Sign In Routes
router.get("/", (req, res) => {
  res.render("sign-in");
});

router.post("/student-sign-in", async (req, res) => {
  console.log(req.session);
  const { user, pass } = req.body;
  if (!req.body.user || !req.body.pass) {
    res.status(400).send("Please provide a username and password");
    return;
  }
  try {
    const studentUser = await Students.findOne({
      where: {
        email: req.body.user,
      },
    });
    const userWeFound = studentUser.dataValues;
    const validPassword = await bcrypt.compare(pass, userWeFound.password);
    if (!validPassword) {
      res.status(400).send("That password is incorrect.");
      console.log("Wrong Password");
    } else {
      req.session.user = userWeFound;
      console.log(userWeFound);
      res.json({
        message: "Login Success",
        user: userWeFound,
      });
      res.status(200);
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/instructor-sign-in", async (req, res) => {
  // console.log(req.session);
  const { user, pass } = req.body;
  if (!req.body.user || !req.body.pass) {
    res.status(400).send("Please provide a username and password");
    return;
  }
  try {
    const instructorUser = await Instructors.findOne({
      where: {
        email: req.body.user,
      },
    });
    const userWeFound = instructorUser.dataValues;
    const validPassword = await bcrypt.compare(pass, userWeFound.password);
    if (!validPassword) {
      res.status(400).send("That password is incorrect.");
      console.log("Wrong Password");
    } else {
      req.session.user = instructorUser;
      res.json({
        message: "Login Success",
        user: userWeFound,
      });
      console.log("This should have worked");
      res.status(200);
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/logout", (req, res) => {
  req.session.user = null;
  console.log(req.session.user);
  res.json({
    message: "Logout Success",
  });
  console.log(res.json.message);
});

module.exports = router;
