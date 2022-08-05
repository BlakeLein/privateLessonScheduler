const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
const es6Renderer = require("express-es6-template-engine");

// Import Models
const { Lessons } = require("../../sequelize/models");
const { Instructors } = require("../../sequelize/models");
const { Students } = require("../../sequelize/models");
const { response } = require("express");

// Middle Ware
app.use(express.json());

// Check for sessions and account type
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
  const getUserName = req.session.user.firstName;
  res.render("instructorHome", {
    locals: {
      getUserName,
    },
  });
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
});

router.post("/claimed-lessons", async (req, res) => {
  const showStudentsWithLessons = await Students.findAll({
    include: {
      model: Lessons,
      as: "lessons",
      where: {
        instructorId: req.session.user.id,
      },
    },
  });
  res.json(showStudentsWithLessons);
});

router.post("/create-lesson", checkTeacherLogin, async (req, res) => {
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

router.delete("/remove-lesson/:id", checkTeacherLogin, async (req, res) => {
  const id = req.params.id;
  const deleteLesson = await Lessons.destroy({
    where: {
      id: id,
    },
  });

  if (deleteLesson) {
    res.status(200).send(`deleted lesson ${deleteLesson}`);
  } else {
    res.status(400).send("error");
  }
});

router.put("/remove-student/:id", checkTeacherLogin, async (req, res) => {
  const id = req.params.id;
  const removeStudent = await Lessons.findOne({
    where: {
      id: id,
    },
  });
  await removeStudent.update({
    available: true,
    studentId: null,
  });
  if (removeStudent) {
    res.status(200).send(`lesson canceled`);
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
});

module.exports = router;
