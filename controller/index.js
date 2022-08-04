// Server Imports
const express = require("express");
const app = express();
const cors = require("cors");
const es6Renderer = require("express-es6-template-engine");
const router = express.Router();
const PORT = 3000;
const models = require("../sequelize/models");

//cookie/session stuff -need double check download packages!
const session = require("express-session");
const cookieParser = require("cookie-parser");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const store = new SequelizeStore({
  db: models.sequelize,
});

// Route Imports
const signUpRoutes = require("./routes/signUpRoutes");
const signInRoutes = require("./routes/signInRoutes");
const studentRoutes = require("./routes/studentRoutes");
const instructorRoutes = require("./routes/instructorRoutes");
const settingsRoutes = require("./routes/settingsRoutes");

// // Middle Ware
app.use(express.json());
app.use(cors());

app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: false,
      maxAge: 2592000000,
    },
  })
);

store.sync();

// Template Engine
app.use(express.static("public"));
app.engine("html", es6Renderer);
app.set("views", "./public/views");
app.set("view engine", "html");

// Routes
// Check login and redirect to student or teacher home page
app.get("/home", (req, res) => {
  res.render("home");
});

app.use("/signup", signUpRoutes);
app.use("/signin", signInRoutes);
app.use("/student", studentRoutes);
app.use("/instructor", instructorRoutes);
app.use("/settings", settingsRoutes);

app.listen(PORT, console.log(`Listening on Port ${PORT}`));
