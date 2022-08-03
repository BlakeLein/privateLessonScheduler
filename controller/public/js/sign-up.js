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

// Flags to control what type of account we have
let studentUser = false;
let instructorUser = false;

// Modal Grabs
const modalClose = document.getElementById("modal-close");
const overlay = document.getElementById("overlay");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("header-title");

// Modal Functions
// Allows the modal to close and overlay to disable when you click outside
overlay.addEventListener("click", () => {
  modal.classList.remove("active");
  overlay.classList.remove("active");
  instructorSelectZone.innerHTML = null;
  studentUser = false;
  instructorUser = false;
  console.log("Student", studentUser);
  console.log("Instructor", instructorUser);
});
// Closes the modal after it's opened
modalClose.addEventListener("click", () => {
  closeModal();
});
// Fucntions to open/close modal
const openModal = (modal) => {
  modal.classList.add("active");
  overlay.classList.add("active");
  console.log("Student", studentUser);
  console.log("Instructor", instructorUser);
};
const closeModal = () => {
  modal.classList.remove("active");
  overlay.classList.remove("active");
  instructorSelectZone.innerHTML = null;
  studentUser = false;
  instructorUser = false;
  console.log("Student", studentUser);
  console.log("Instructor", instructorUser);
};

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

const addInstructorOption = async () => {
  instructorSelectZone.innerText = "Select Your Instructor";
  let instructorSelect = document.createElement("select");
  instructorSelect.id = "instructor";
  let instructorDefaultOption = document.createElement("option");
  instructorDefaultOption.value = "";
  instructorDefaultOption.disabled = true;
  instructorDefaultOption.selected = true;
  instructorDefaultOption.hidden = true;
  instructorDefaultOption.innerText = "Select Your Instructor";
  instructorSelect.append(instructorDefaultOption);
  instructorSelectZone.append(instructorSelect);
};

// Opens Modals
studentAccount.addEventListener("click", async () => {
  modalTitle.innerText = "Create a New Student Account";
  studentUser = true;
  // addInstructorOption();
  openModal(modal);
});

instructorAccount.addEventListener("click", () => {
  modalTitle.innerText = "Create a New Instructor Account";
  instructorUser = true;
  instructorSelectZone.innerHTML = null;
  openModal(modal);
});

// Send Info to Routes
// Functiomn to Send Data to create-student-user route
const sendStudentData = async () => {
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
  // Functiomn to Send Data to create-instructor-user route
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

// Function to check that passwords match
const checkPasswords = (pass1, pass2) => {
  if (pass1.value === pass2.value) {
    return true;
  }
};

// Submit button
form.addEventListener("submit", (e) => {
  if (checkPasswords(password1, password2) == true) {
    if (studentUser == true) {
      e.preventDefault();
      sendStudentData();
      alert("Account successfully created!");
    } else if (instructorUser == true) {
      e.preventDefault();
      sendInstructorData();
      alert("Account successfully created!");
    }
  } else {
    alert("Your passwords do not match. Please try again.");
  }
});
