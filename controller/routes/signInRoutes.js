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

// Sign In Routes
router.get("/", (req, res) => {
  res.render("sign-in");
});

router.post("/student-sign-in", async (req, res) => {
  const { user, pass } = req.body;
  if (!req.body.user || !req.body.pass) {
    res.status(400).json({
      message: "Please enter username and password.",
    });
  }
  try {
    const studentUser = await Students.findOne({
      where: {
        email: req.body.user,
      },
    });
    if (!studentUser) {
      res.status(400).json({ message: "That username is incorrect." });
    } else {
      const userWeFound = studentUser.dataValues;
      const validPassword = await bcrypt.compare(pass, userWeFound.password);
      if (!validPassword) {
        res.status(400).json({
          message: "That password is incorrect.",
        });
      } else {
        req.session.user = userWeFound;
        res.json({
          message: "Login Success",
          user: userWeFound,
        });
        res.status(200);
      }
    }
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/instructor-sign-in", async (req, res) => {
  const { user, pass } = req.body;
  if (!req.body.user || !req.body.pass) {
    res.status(400).json({
      message: "Please enter username and password.",
    });
  }
  try {
    const instructorUser = await Instructors.findOne({
      where: {
        email: req.body.user,
      },
    });
    if (!instructorUser) {
      res.status(400).json({ message: "That username is incorrect." });
    } else {
      const userWeFound = instructorUser.dataValues;
      const validPassword = await bcrypt.compare(pass, userWeFound.password);
      if (!validPassword) {
        res.status(400).json({
          message: "That password is incorrect.",
        });
      } else {
        req.session.user = instructorUser;
        res.json({
          message: "Login Success",
          user: userWeFound,
        });
        res.status(200);
      }
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/logout", (req, res) => {
  req.session.user = null;
  res.json({
    message: "Logout Success",
  });
});

module.exports = router;
