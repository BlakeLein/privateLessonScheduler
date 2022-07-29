const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const password1 = document.getElementById("password1");
const password2 = document.getElementById("password2");
const instrument = document.getElementById("instrument");
const instrumentOptions = document.getElementById("instrument-options");
const instructor = document.getElementById("instructor");
const accountType = document.getElementById("account-type");
const submitButton = document.getElementById("submit");
const displayZone = document.getElementById("display-zone");

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

populateInstrumentOptions(listOfInstruments.sort());

// const renderStudentInfo = () => {
//   // First Name
//   let inputItem = document.createElement("div");
//   let name = document.createElement("label");
//   name.innerText = "FirstName";
// };
// const renderInstructorInfo = () => {};

const sendStudentData = async () => {
  console.log("student data");
  const data = {
    first: firstName.value,
    last: lastName.value,
    email: email.value,
    password: password2.value,
    instrument: instrumentOptions.value,
    instructor: "Mark Barton",
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
};

const sendInstructorData = async () => {
  console.log("isntructor data");
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
};

const checkPasswords = (pass1, pass2) => {
  if (pass1.value === pass2.value) {
    return true;
  }
};

submitButton.addEventListener("click", () => {
  if (checkPasswords(password1, password2) == true) {
    if (accountType.value == "Student") {
      sendStudentData();
    } else if (accountType.value == "Instructor") {
      sendInstructorData();
    }
  } else {
    let passwordMatchError = document.createElement("h3");
    passwordMatchError.innerText =
      "Your passwords do not match. Please try again.";
    displayZone.append(passwordMatchError);
  }
});
