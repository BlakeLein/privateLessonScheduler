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
router.get("/student", async (req, res) => {
  const listOfInstruments = [
    "Piccolo",
    "Flute",
    "Oboe",
    "Bassoon",
    "Clarinet",
    "Bass Clarinet",
    "Alto Saxophone",
    "Tenor Saxophone",
    "Bari Saxophone",
    "Trumpet",
    "French Horn",
    "Trombone",
    "Bass Trombone",
    "Euphonium",
    "Tuba",
    "Percussion",
    "Violin",
    "Viola",
    "Cello",
    "Double Bass",
    "Vocal - Soprano",
    "Vocal - Alto",
    "Vocal - Tenor",
    "Vocal - Bass",
  ];
  const sortedInstruments = listOfInstruments.sort();
  // Find all instructors by name
  let listOfInstructors = [];
  let getInstructors = await Instructors.findAll({
    attributes: ["firstName", "lastName"],
  });
  // Loop through database and add each instructor to a list
  for (let i = 0; i < getInstructors.length; i++) {
    listOfInstructors.push(getInstructors[i]);
  }
  res.render("student-sign-up", {
    locals: {
      listOfInstructors,
      sortedInstruments,
    },
  });
});

router.get("/instructor", (req, res) => {
  res.render("instructor-sign-up");
});

router.post("/create-student-user", async (req, res) => {
  const { first, last, email, password, instrument, instructor } = req.body;
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
    res.json({
      message: "Account Created",
    });
    res.status(200);
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
    res.json({
      message: "Account Created",
    });
    res.status(200);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
