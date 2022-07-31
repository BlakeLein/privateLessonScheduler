const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
const es6Renderer = require("express-es6-template-engine");

// Import Models
const { Lessons } = require("../../sequelize/models");

// Middle Ware
app.use(express.json());

router.get("/home", (req, res) => {
  res.render("instructorView");
});

router.get("/create", (req, res) => {
  res.render("instructorCreate");
});

router.get("/studio", (req, res) => {
  res.render("instructorStudio");
});

router.post("/create-lesson", async (req, res) => {
  console.log(req.body);
  const { date, start, stop, cost } = req.body;
  try {
    const newLesson = {
      instructorId: 1,
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

module.exports = router;
