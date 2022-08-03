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

router.post("/lessons-from-instructor", async (req, res) => {
  const instructor = req.session.user.instructor;
  const instructorSplit = instructor.split(" ");
  const first = instructorSplit[0];
  const last = instructorSplit[1];
  const findInstructor = await Instructors.findOne({
    where: {
      firstName: first,
      lastName: last,
    },
  });
  const foundInstructorId = findInstructor.id;
  // console.log(foundInstructorId);

  const showAvailableLessons = await Lessons.findAll({
    where: {
      instructorId: foundInstructorId,
      available: true,
    },
  });
  // console.log(showAvailableLessons);
  res.json(showAvailableLessons);
});

router.post("/view-my-lessons", async (req, res) => {
  const studentId = req.session.user.id;

  const findMyLessons = await Lessons.findAll({
    where: {
      studentId: studentId,
    },
  });
  console.log(findMyLessons);
  res.json(findMyLessons);
});

router.put("/claim-lesson/:id", async (req, res) => {
  console.log("Hit this route");
  console.log(req.params.id);
  const id = req.params.id;
  const claimLesson = await Lessons.findOne({
    where: {
      id: id,
    },
  });
  await claimLesson.update({
    available: false,
    studentId: req.session.user.id,
  });
  if (claimLesson) {
    res.status(200).send(`lesson claimed`);
  } else {
    res.status(400).send("error");
  }
});

router.put("/cancel-lesson/:id", async (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  const cancelLesson = await Lessons.findOne({
    where: {
      id: id,
    },
  });
  await cancelLesson.update({
    available: true,
    studentId: null,
  });
  if (cancelLesson) {
    res.status(200).send(`lesson canceled`);
  } else {
    res.status(400).send("error");
  }
});

// const showAvailableLessons = await Lessons.findAll({
//   where: {
//     instructorId: req.session.user.id,
//     available: true,
//   },
// });
// const listOfLessons = [];
// for (let i = 0; i < showAvailableLessons.length; i++) {
//   listOfLessons.push(showAvailableLessons[i].dataValues);
// }
// res.json(listOfLessons);
// res.render("instructorHome", {
//   locals: {
//     listOfLessons,
//   },
// });

// Check for sessions and account type
const checkStudentLogin = (req, res, next) => {
  try {
    if (req.session.user.instructor) {
      next();
    } else if (req.session.user) {
      res.render("instructorHome");
    }
  } catch (error) {
    res.render("home");
  }
};

router.get("/home", checkStudentLogin, (req, res) => {
  console.log("Instructor test in route", req.session.user);
  res.render("studentHome");
});

module.exports = router;
