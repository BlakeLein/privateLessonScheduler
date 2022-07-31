// Server Imports
const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
const es6Renderer = require("express-es6-template-engine");
const bcrypt = require("bcrypt");

// Import Modals
const { Students } = require("../../sequelize/models");
const { Instructors } = require("../../sequelize/models");
const { Lessons } = require("../../sequelize/models");

// Middle Ware
app.use(express.json());

// Sign In Routes
router.get("/", (req, res) => {
  res.render("sign-in");
});

router.post("/signin/student-sign-in", async (req, res) => {
  const { user, pass } = req.body;
  try {
    const findUser = await Student.findOne({
      where: {
        email: user,
      },
    });
    const userWeFound = findUser.dataValues;
    const validated = await bcrypt.compare(pass, userWeFound.password);
    if (!findUser) {
      res
        // If they fail the login do this.
        .status(400)
        .send(
          "That user does not exist in our database. Did you get the username correct?"
        );
    } else {
      // If they log in successfully do this.
      res.status(200).send(findUser.dataValues).redirect("/homepage");
    }
  } catch (error) {
    res.send("That user is not in our system. Please create an account first.");
  }
});

router.post("/signin/instructor-sign-in", async (req, res) => {
  console.log(req.body);
  const { user, pass } = req.body;
  try {
    const findUser = await Instructor.findOne({
      where: {
        email: user,
      },
    });
    const userWeFound = findUser.dataValues;
    const validated = await bcrypt.compare(password, userWeFound.password);
    if (!findUser) {
      res
        // If they fail the login do this.
        .status(400)
        .send(
          "That user does not exist in our database. Did you get the username correct?"
        );
    } else {
      // If they log in successfully do this.
      res.status(200).send(findUser.dataValues).redirect("/homepage");
    }
  } catch (error) {
    res.send("That user is not in our system. Please create an account first.");
  }
});

module.exports = router;
