const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const password1 = document.getElementById("password1");
const password2 = document.getElementById("password2");
const instrument = document.getElementById("instrument");
const instrumentOptions = document.getElementById("instrument-options");
const instructor = document.getElementById("instructor");
const form = document.getElementById("form");
const studentAccount = document.getElementById("student-account");
const instructorAccount = document.getElementById("instructor-account");
const instructorSelect = document.getElementById("instructor-select");
const instrumentSelection = document.getElementById("instrument-options");

const listOfInstruments = [
  "Piccolo",
  "Flute",
  "Oboe",
  "Bassoon",
  "Clarinet",
  "Bass Clarinet",
  "Alto Saxophone",
  "Tenor Saxophone",
  "Bari Saxophone",
  "Trumpet",
  "French Horn",
  "Trombone",
  "Bass Trombone",
  "Euphonium",
  "Tuba",
  "Percussion",
  "Violin",
  "Viola",
  "Cello",
  "Double Bass",
  "Vocal - Soprano",
  "Vocal - Alto",
  "Vocal - Tenor",
  "Vocal - Bass",
];

// Send Info to Routes
// Functiomn to Send Data to create-student-user route
const sendStudentData = async () => {
  const data = {
    first: firstName.value,
    last: lastName.value,
    email: email.value,
    password: password2.value,
    instrument: instrumentOptions.value,
    instructor: instructorSelect.value,
  };
  const dataWeAreSending = await fetch(
    "http://localhost:3000/signup/create-student-user",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const json = await dataWeAreSending.json();
  if (json.message != "Account Created") {
    window.location.href = "/signup/student";
  } else {
    alert("Account successfully created!");
    window.location.href = "/signin";
  }
};

// Function to check that passwords match
const checkPasswords = (pass1, pass2) => {
  if (pass1.value === pass2.value) {
    return true;
  }
};

// Submit button
form.addEventListener("submit", (e) => {
  if (checkPasswords(password1, password2) == true) {
    e.preventDefault();
    sendStudentData();
  } else {
    alert("Your passwords do not match. Please try again.");
  }
});
