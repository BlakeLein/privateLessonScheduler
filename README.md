 <div align="center">

  <img src="src\assets\readme\logo.png" alt="logo" width="200" height="auto" />

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

### Color Reference

<a href="https://coolors.co/002642-840032-e59500-e5dada-02040f">Coolors</a>

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
  npm install
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
  <div align="center"> 
<img style="width: 400px" src="src\assets\readme\signup.PNG"/>
</div>
</details>

```javascript

```
When Users sign in thier credentials are checked in our database.
<details>
  <summary>Sign-in</summary>
  <div align="center"> 
<img style="width: 550px" src="src\assets\readme\createParty.PNG"/>
</div>
</details>

```javascript

```

From the dashboard users can then view their party, change their avatar, or search for a specidfic party if the party ID is known.

<details>
  <summary>Dashboard</summary>
  <div align="center"> 
<img style="width: 550px" src="src\assets\readme\dashboard.PNG"/>
</div>
</details>

```javascript

```

The party page displays all the information the user submitted once creating the party, and features a countdown, comment section, guest list, supplies section, and a place for guests to let the host know if they can attend. Hosts have the ability to invite guests or edit the party.

<details>
  <summary>Party Details (Host Point of View)</summary>
  <div align="center"> 
<img style="width: 550px" src="src\assets\readme\hostView.PNG"/>
</div>
</details>
<details>
  <summary>Party Details (Guest Point of View)</summary>
  <div align="center"> 
<img style="width: 550px" src="src\assets\readme\guestView.PNG"/>
</div>
</details>

```javascript

```

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

