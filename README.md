 <div align="center">

  <img src="" alt="logo" width="200" height="auto" />

  <p>
    Welcome to Musicaly: A Private Lesson App
  </p>

<h4>
    
  </h4>
</div>

<br />

<!-- Table of Contents -->

# Table of Contents

- [About the Project](#about-the-project)
  - [Screenshots](#screenshots)
  - [Tech Stack](#tech-stack)
  - [Features](#features)
  - [Color Reference](#color-reference)
- [Getting Started](#getting-started)
  - [Run Locally](#run-locally)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [Acknowledgements](#acknowledgements)


<!-- About the Project -->

## About the Project

<!-- Screenshots -->

  <img src="src\controller\public\images\webHome.jpg" style= width:600px />

<!-- TechStack -->

### Tech Stack

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://www.javascript.com/">JavaScript</a></li>
    <li><a href="https://nodejs.org/en/">Node.js</a></li>
    <li><a href="https://sequelize.org/">Sequelize</a></li>
    <li>Custom HTML/CSS</li>
  </ul>
</details>

<details>
<summary>Database</summary>
  <ul>
    <li><a href="https://www.elephantsql.com/">PostgreSQL</a></li>
  </ul>
</details>





<!-- Features -->

### Features

- Account Creation as Student or Instructor
- Ability to Create Lessons
- Ability to View Created, Available & Scheduled Lessons
- Deleting/Canceling a Lesson
- Mobile Responsive
- Changing User Settings

<!-- Color Reference -->

### Color Reference & Styles

<a href="https://coolors.co/002642-840032-e59500-e5dada-02040f">Coolors</a>
- <span style="color:#840032">#840032</span>.
- <span style="color:#002642">#002642</span>.
- <span style="color:#E59500">#E59500</span>.
- <span style="color:#E5DADA">#E5DADA</span>.
- <span style="color:#02040F">#02040F</span>.

<!-- Env Variables -->

### Environment Variables



<!-- Getting Started -->

## Getting Started

<!-- Run Locally -->

### Run Locally

Clone the project

https://github.com/BlakeLein/privateLessonScheduler

Go to the project directory

You must have previously installed:
Node.js
Nodemon
Sequelize

```bash
  cd privateLessonScheduler
```

Install dependencies

```bash
  npm i
```

Start the server

```bash
  cd controller
  nodemon
```

<!-- Usage -->

## Usage

Users fill out a form to sign up, the contents of the form get sent to our database to create a user.

<details>
  <summary>Sign Up Page</summary>
<img alt="mobiledash"width = "400px" src="/controller/public/mobileDash.jpg"/>
</details>

```javascript
router.post("/create-instructor-user", async (req, res) => {
  const { first, last, email, password, instrument } = req.body;
  try {
    const salt = await bcrypt.genSalt(7);
    const hashedPassword = await bcrypt.hash(password, salt);
    const encryptedUser = {
      firstName: first,
      lastName: last,
      email: email,
      password: hashedPassword,
      instrument: instrument,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const createUser = await Instructors.create(encryptedUser);
    res.json({
      message: "Account Created",
    });
    res.status(200);
  } catch (error) {
    res.send(error.message);
  }
});
```
When Users sign in thier credentials are checked in our database.
<details>
  <summary>Sign-in</summary>
  <div align="center"> 
<img style="width: 550px" src=""/>
</div>
</details>

```javascript
router.post("/instructor-sign-in", async (req, res) => {
  const { user, pass } = req.body;
  if (!req.body.user || !req.body.pass) {
    res.status(400).json({
      message: "Please enter username and password.",
    });
  }
  try {
    const instructorUser = await Instructors.findOne({
      where: {
        email: req.body.user,
      },
    });
    if (!instructorUser) {
      res.status(400).json({ message: "That username is incorrect." });
    } else {
      const userWeFound = instructorUser.dataValues;
      const validPassword = await bcrypt.compare(pass, userWeFound.password);
      if (!validPassword) {
        res.status(400).json({
          message: "That password is incorrect.",
        });
      } else {
        req.session.user = instructorUser;
        res.json({
          message: "Login Success",
          user: userWeFound,
        });
        res.status(200);
      }
    }
  } catch (error) {
    res.send(error);
  }
});
```

From the dashboard users can view the lessons that they have scheduled.

<details>
  <summary>Dashboard</summary>
  <div align="center"> 
<img style="width: 550px" src=""/>
</div>
</details>

```javascript
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
```

Each user has a specific dashboard with features unique to the type of user they are. Instructors have more features than students.

<details>
  <summary>Lesson Dashboard (Instructor Point of View)</summary>
  <div align="center"> 
<img style="width: 550px" src=""/>
</div>
</details>
<details>
  <summary>Lesson Dashbopard (Student Point of View)</summary>
  <div align="center"> 
<img style="width: 550px" src="src\assets\readme\guestView.PNG"/>
</div>
</details>

<!-- Contributing -->

## Contributing

<div style=display:flex>

<a href="https://github.com/BlakeLein">
  <img src="https://avatars.githubusercontent.com/u/101301999?v=4" alt="logo" width="100" height="auto"

<a href="https://github.com/Emgula96">
  <img src="https://avatars.githubusercontent.com/u/106848391?s=400&u=5158bf4aed7661d1f7feb389ef5760b861513990&v=4" alt="logo" width="100" height="auto" />
</a>
</div>



## Acknowledgements

A Special Thanks to our Instructor Joe and TA Violet!

- [Joe Fraiser](https://github.com/jwfrasier)
- [Violet]()

