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
const populateInstrumentOptions = (array) => {
  for (let i = 0; i < array.length; i++) {
    let option = document.createElement("option");
    option.innerText = array[i];
    instrumentOptions.append(option);
  }
};

// Populate Instrument Options on Start-up
populateInstrumentOptions(listOfInstruments.sort());

// Send Info to Routes

const sendInstructorData = async () => {
  // Function to Send Data to create-instructor-user route
  const data = {
    first: firstName.value,
    last: lastName.value,
    email: email.value,
    password: password2.value,
    instrument: instrumentOptions.value,
  };
  const dataWeAreSending = await fetch(
    "http://localhost:3000/signup/create-instructor-user",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const json = await dataWeAreSending.json();
  if (json.message != "Account Created"){
    window.location.href= "/signup/student"}
  else{
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
    sendInstructorData();
  } else {
    alert("Your passwords do not match. Please try again.");
  }
});
