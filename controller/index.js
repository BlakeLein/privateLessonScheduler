// Server Imports
const express = require("express");
const app = express();
const cors = require("cors");
const es6Renderer = require("express-es6-template-engine");
const router = express.Router();
const PORT = 3000;

// Route Imports

const signRoutes = require("./routes/signRoutes");
const studentRoutes = require("./routes/studentRoutes");
const instructorRoutes = require("./routes/instructorRoutes");

// // Middle Ware
app.use(express.json());
app.use(cors());

// Template Engine
app.use(express.static("public"));
app.engine("html", es6Renderer);
app.set("views", "./public/views");
app.set("view engine", "html");

// Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.use("/", signRoutes);
app.use("/student", studentRoutes);
app.use("/instructor", instructorRoutes);

app.listen(PORT, console.log(`Listening on Port ${PORT}`));
