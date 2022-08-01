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
const instructorSelectZone = document.getElementById("instructor-select-zone");
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
// const populateInstrumentOptions = (array) => {
//   for (let i = 0; i < array.length; i++) {
//     let option = document.createElement("option");
//     option.innerText = array[i];
//     instrumentOptions.append(option);
//   }
// };

// Populate Instrument Options on Start-up
// populateInstrumentOptions(listOfInstruments.sort());

// Send Info to Routes
// Functiomn to Send Data to create-student-user route
const sendStudentData = async () => {
  const data = {
    first: firstName.value,
    last: lastName.value,
    email: email.value,
    password: password2.value,
    instrument: instrumentOptions.value,
    instructor: instrumentSelection.value,
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
  alert("Account successfully created!");
  window.location.href = "/signin";

  const json = await dataWeAreSending.json();
  console.log(json);
};

// Function to check that passwords match
const checkPasswords = (pass1, pass2) => {
  if (pass1.value === pass2.value) {
    return true;
  }
};

// Submit button
form.addEventListener("submit", (e) => {
  console.log("Click Worked");
  if (checkPasswords(password1, password2) == true) {
    e.preventDefault();
    sendStudentData();
  } else {
    alert("Your passwords do not match. Please try again.");
  }
});
