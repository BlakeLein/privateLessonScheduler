const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
const es6Renderer = require("express-es6-template-engine");

// Import Models
const { Lessons } = require("../../sequelize/models");
const { Instructors } = require("../../sequelize/models");
const { Students } = require("../../sequelize/models");

// Middle Ware
app.use(express.json());

// Check for session
const checkUser = (req, res, next) => {
  try {
    if (req.session.user) {
      next();
    } else {
      res.render("home");
    }
  } catch (error) {
    res.render("home");
  }
};

router.get("/", checkUser, async (req, res) => {
  // Find all instructors by name
  let listOfInstructors = [];
  let getInstructors = await Instructors.findAll({
    attributes: ["firstName", "lastName"],
  });
  // Loop through database and add each instructor to a list
  for (let i = 0; i < getInstructors.length; i++) {
    listOfInstructors.push(getInstructors[i]);
  }
  if (req.session.user.instructor) {
    res.render("Ssettings", {
      locals: {
        listOfInstructors,
      },
    });
  } else if (req.session.user) {
    res.render("Isettings", {
      locals: {
        listOfInstructors,
      },
    });
  }
});

router.put("/change-username", checkUser, async (req, res) => {
  console.log(req.session.user);

  const { newUsername } = req.body;
  try {
    if (req.session.user.instructor) {
      const findStudent = await Students.findOne({
        where: {
          id: req.session.id,
        },
      });
      await findStudent.update({
        email: newEmail,
      });
      res.json("changed student email");
    } else if (req.session.user) {
      const currentEmail = req.session.user.email;
      const findInstructor = await Instructors.findOne({
        where: {
          id: req.session.id,
        },
      });
      await findInstructor.update({
        email: newEmail,
      });
      res.json("changed instructor email");
    }
  } catch (error) {
    res.send(error);
  }
});

router.put("/change-password", checkUser, async (req, res) => {
  const { newPassword } = req.body;
  try {
    if (req.session.user.instructor) {
      const currentPassword = req.session.user.password;
      const findStudent = await Students.findOne({
        where: {
          id: req.student.id,
        },
      });
      await findStudent.update({
        password: newPassword,
      });
      res.json("changed student password");
    } else if (req.session.user) {
      const currentPassword = req.session.user.password;
      const findInstructor = await Instructors.findOne({
        where: {
          id: req.student.id,
        },
      });
      await findInstructor.update({
        password: newPassword,
      });
      res.json("changed instructor password");
    }
  } catch (error) {
    res.send(error);
  }
});

router.put("/change-instrument", checkUser, async (req, res) => {
  const { newInstrument } = req.body;
  try {
    if (req.session.user.instructor) {
      const findStudent = await Students.findOne({
        where: {
          id: req.session.id,
        },
      });
      await findStudent.update({
        instrument: newInstrument,
      });
      res.json("changed student instrument");
    } else if (req.session.user) {
      const findInstructor = await Instructors.findOne({
        where: {
          id: req.session.id,
        },
      });
      await findInstructor.update({
        instrument: newInstrument,
      });
      res.json("changed instructor instrument");
    }
  } catch (error) {
    res.send(error);
  }
});

router.put("/change-instructor", checkUser, async (req, res) => {
  const { newInstructor } = req.body;
  try {
    const findStudent = await Students.findOne({
      where: {
        id: req.session.id,
      },
    });
    await findStudent.update({
      instrument: newInstrument,
    });
    res.json("changed student instrument");
  } catch (error) {
    res.send(error);
  }
});

router.delete("/delete-account", checkUser, async (req, res) => {
  try {
    if (req.session.user.instructor) {
      const deleteStudent = await Students.destroy({
        where: {
          id: req.session.id,
        },
      });
    } else if (req.session.user) {
      const deleteInstructor = await Instructors.destroy({
        where: {
          id: req.session.id,
        },
      });
    }
    res.json("account deleted");
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
