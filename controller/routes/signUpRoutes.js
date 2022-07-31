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
    res.redirect("./signin");
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/create-instructor-user", async (req, res) => {
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

    res.redirect("http://localhost:3000/signin");
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
