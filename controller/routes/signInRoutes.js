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

const checkLogin = (req, res, next) => {
    if (req.session.user){
      next()
    } else 
    {
      res.json({
        message:"Login Required"
      })
    }
    }

// Sign In Routes
router.get("/", (req, res) => {
  res.render("sign-in");
});

router.post("/student-sign-in", async (req, res) => {
  console.log(req.session)
  const { user, pass } = req.body;
  try {
    const findUser = await Students.findOne({
      where: {
        email: user,
      },
    });
    // const userWeFound = findUser.dataValues;
    // const validated = await bcrypt.compare(pass, userWeFound.password);
    console.log("found user?")
    if (!findUser) {
      console.log("helllllo")
      // If they fail the login do this.
      // .status(400)
      res.send(
          "That user does not exist in our database. Did you get the username correct?"
        );
    } else {
      req.session.findUser = findUser
      res.json({message:
        "login sucess",
      findUser: findUser})
      // If they log in successfully do this.
      // res.status(200).send(findUser.dataValues)
      // console.log("i work, i think")
      console.log(req.session.findUser)
    }
  } catch (error) {
    console.log(error)
    console.log("oops an erro")
    res.send("That user is not in our system. Please create an account first.");
  }
});

router.post("/instructor-sign-in", async (req, res) => {
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



router.post("/instructor-test", checkLogin, async (req,res)=>{
  res.send("okay homie you work")
})

module.exports = router;
