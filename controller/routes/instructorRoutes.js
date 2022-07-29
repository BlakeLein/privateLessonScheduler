const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
const es6Renderer = require("express-es6-template-engine");

// Middle Ware
app.use(express.json());

router.get("/home", (req, res) => {
  res.render("teacherView");
});

router.get("/create", (req, res) => {
  res.render("teacherCreate");
});

router.get("/studio", (req, res) => {
  res.render("teacherStudio");
});

module.exports = router;
