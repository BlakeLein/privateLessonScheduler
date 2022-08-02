const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
const es6Renderer = require("express-es6-template-engine");

// Import Models
const { Lessons } = require("../../sequelize/models");
const { Instructors } = require("../../sequelize/models");

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
};
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

router.get("/home", checkTeacherLogin, (req, res) => {
  res.render("instructorHome");
});

router.post("/create-lesson", checkTeacherLogin, async (req, res) => {
  console.log(req.body);
  const { date, start, stop, cost } = req.body;
  try {
    const newLesson = {
      instructorId: req.session.user.id,
      studentId: null, // Add student later?
      date: date,
      startTime: start,
      stopTime: stop,
      cost: cost,
      available: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const createLesson = await Lessons.create(newLesson);
    res.send(alert("Lesson Created!"));
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/get-instructors", async (req, res) => {
  let listOfInstructors = [];
  // Find all instructors by name
  let getInstructors = await Instructors.findAll({
    attributes: ["firstName", "lastName"],
    s,
  });
  // Loop through database and add each instructor to a list
  for (let i = 0; i < getInstructors.length; i++) {
    listOfInstructors.push(getInstructors[i]);
  }

  res.send(listOfInstructors);

  // res.render("sign-up", {
  //   locals: {
  //     listOfInstructors,
  //   },
  // });
});

module.exports = router;
