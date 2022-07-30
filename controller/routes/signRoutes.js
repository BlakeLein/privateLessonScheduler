const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
const es6Renderer = require("express-es6-template-engine");
const bcrypt = require("bcrypt");

// Import Modals
const { Students } = require("../../sequelize/models");
const { Instructors } = require("../../sequelize/models");

// Middle Ware
app.use(express.json());

// Sign Up Routes
router.get("/", (req, res) => {
  res.render("sign-up");
});

router.post("/create-student-user", async (req, res) => {
  console.log(req.body);
  const { first, last, email, password, instrument, instructor } = req.body;
  console.log({
    first,
    last,
    email,
    password,
    instrument,
    instructor,
  });
  try {
    const salt = await bcrypt.genSalt(7);
    const hashedPassword = await bcrypt.hash(password, salt);
    const encryptedUser = {
      firstName: first,
      lastName: last,
      email: email,
      password: hashedPassword,
      instrument: instrument,
      instructor: instructor,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const createUser = await Students.create(encryptedUser);
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/create-instructor-user", async (req, res) => {
  console.log(req.body);
  const { first, last, email, password, instrument } = req.body;
  try {
    const salt = await bcrypt.genSalt(7);
    const hashedPassword = await bcrypt.hash(password, salt);
    const encryptedUser = {
      firstName: first,
      lastName: last,
      email: email,
      password: hashedPassword,
      instrument: instrument,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const createUser = await Instructors.create(encryptedUser);
  } catch (error) {
    res.send(error.message);
  }
});

// Sign In Routes
router.get("/signin", (req, res) => {
  res.render("sign-in");
});

router.post("/signin/student-sign-in", async (req, res) => {
  console.log(req.body);
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
