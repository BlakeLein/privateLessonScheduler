const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
const es6Renderer = require("express-es6-template-engine");

// Import Models
const { Lessons } = require("../../sequelize/models");
const { Instructors } = require("../../sequelize/models");
const { response } = require("express");

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
  try {
    if (!req.session.user.instructor) {
      next();
    } else if (req.session.user.instructor) {
      res.render("studentHome");
    } else {
      res.render("home");
    }
  } catch (error) {
    res.render("home");
  }
};

router.get("/home", checkTeacherLogin, async (req, res) => {
  res.render("instructorHome");
});

router.post("/populate-lessons", async (req, res) => {
  const showAvailableLessons = await Lessons.findAll({
    where: {
      instructorId: req.session.user.id,
      available: true,
    },
  });
  const listOfLessons = [];
  for (let i = 0; i < showAvailableLessons.length; i++) {
    listOfLessons.push(showAvailableLessons[i].dataValues);
  }

  res.json(listOfLessons);
  // res.render("instructorHome", {
  //   locals: {
  //     listOfLessons,
  //   },
  // });
});

router.post("/claimed-lessons", async (req, res) => {
  const showAvailableLessons = await Lessons.findAll({
    where: {
      instructorId: req.session.user.id,
      available: false,
    },
  });
  const listOfLessons = [];
  for (let i = 0; i < showAvailableLessons.length; i++) {
    listOfLessons.push(showAvailableLessons[i].dataValues);
  }

  res.json(listOfLessons);
  // res.render("instructorHome", {
  //   locals: {
  //     listOfLessons,
  //   },
  // });
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
    res.send(createLesson);
  } catch (error) {
    res.send(error.message);
  }
});

router.delete("/remove-lesson/:id", async (req, res) => {
  console.log("Is this hitting");
  const id = req.params.id;
  const deleteLesson = await Lessons.destroy({
    where: {
      id: id,
    },
  });
  console.log(deleteLesson);

  if (deleteLesson) {
    res.status(200).send(`deleted lesson ${deleteLesson}`);
  } else {
    res.status(400).send("error");
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
