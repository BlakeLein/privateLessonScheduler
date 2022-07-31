// Server Imports
const express = require("express");
const app = express();
const cors = require("cors");
const es6Renderer = require("express-es6-template-engine");
const router = express.Router();
const PORT = 3000;

//cookie/session stuff -need double check download packages!
const session = require("express-session");
const cookieParser = require("cookie-parser");
// const SequelizeStore = require("connect-session-sequelize")(session.Store);
// const store = new SequelizeStore({
//   db: models.sequelize,
// });

// Route Imports

const signUpRoutes = require("./routes/signUpRoutes");
const signInRoutes = require("./routes/signInRoutes");
const studentRoutes = require("./routes/studentRoutes");
const instructorRoutes = require("./routes/instructorRoutes");

// // Middle Ware
app.use(express.json());
app.use(cors());

// app.use(cookieParser());
// app.use(
//   session({
//     secret: "secret",
//     resave: false,
//     saveUninitialized: false,
//     store: store,
//     cookie: {
//       secure:false,
//       maxAge: 2592000000,
//     },
//   })
// );
// store.sync();

// Template Engine
app.use(express.static("public"));
app.engine("html", es6Renderer);
app.set("views", "./public/views");
app.set("view engine", "html");

// Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.use("/signup", signUpRoutes);
app.use("/signin", signInRoutes);
app.use("/student", studentRoutes);
app.use("/instructor", instructorRoutes);

app.listen(PORT, console.log(`Listening on Port ${PORT}`));
