const date = document.getElementById("date");
const startTime = document.getElementById("start-time");
const stopTime = document.getElementById("stop-time");
const cost = document.getElementById("cost");
const submitButton = document.getElementById("submit");
const form = document.getElementById("form");

// Modal Grabs
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const closeModalButton = document.getElementById("modal-close");
const createLessonButton = document.getElementById("create-lesson");

// Functions to open/close modal
const openModal = () => {
  modal.classList.add("active");
  overlay.classList.add("active");
};
const closeModal = () => {
  modal.classList.remove("active");
  overlay.classList.remove("active");
};
// Allows the modal to close and overlay to disable when you click outside
overlay.addEventListener("click", () => {
  modal.classList.remove("active");
  overlay.classList.remove("active");
});

// Closes the modal after it's opened
closeModalButton.addEventListener("click", () => {
  closeModal();
});

// Populating Available Lessons
const availableLessonButton = document.getElementById("view-available");
const displayZone = document.getElementById("display-container");

const something = document.querySelector("#something");

// Delete Available Lessons
something.addEventListener("click", async (e) => {
  try {
    e.preventDefault();

    if (e.target.className === "deleteAvailable") {
      let primaryKey = e.target.id;

      const deletingItem = await fetch(
        `http://localhost:3000/instructor/remove-lesson/${primaryKey}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Lesson Deleted");
      getAvailableLessons();
    } else if (e.target.className === "deleteClaimed") {
      let primaryKey = e.target.id;

      const deletingItem = await fetch(
        `http://localhost:3000/instructor/remove-lesson/${primaryKey}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Lesson Deleted");
      getClaimedLessons();
    } else if (e.target.className === "removeStudent") {
      let primaryKey = e.target.id;

      const deletingItem = await fetch(
        `http://localhost:3000/instructor/remove-student/${primaryKey}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Student Removed");
      getClaimedLessons();
    }
  } catch (error) {
    console.log(error);
  }
});

const getFormattedDate = (date) => {
  const splitDate = date.split("-");
  const year = splitDate[0];
  const month = splitDate[1];
  const day = splitDate[2];
  const formattedDate = `${month}/${day}/${year}`;
  return formattedDate;
};
const getFormattedTime = (time) => {
  const splitTime = time.split(":");
  if (splitTime[0] > "12") {
    const newTime = splitTime[0] - 12;
    const formattedTime = `${newTime}:${splitTime[1]} PM`;
    return formattedTime;
  } else {
    const formattedTime = `${splitTime[0]}:${splitTime[1]} AM`;
    return formattedTime;
  }
};

const getAvailableLessons = async () => {
  const dataWeAreSending = await fetch(
    "http://localhost:3000/instructor/populate-lessons",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const json = await dataWeAreSending.json();

  let html = "";

  for (let i = 0; i < json.length; i++) {
    html += `
            <div id="sample-card">
            <div id="card-title">Available Lesson</div>
            <div id="card-body">
            <div class="card-item" id="card-date">Date: ${getFormattedDate(
              json[i].date
            )}</div>
              <div class="card-item" id="card-start-time">Start Time: ${getFormattedTime(
                json[i].startTime
              )}</div>
              <div class="card-item" id="card-stop-time">Start Time: ${getFormattedTime(
                json[i].stopTime
              )}</div>
              <div class="card-item" id="card-cost">Cost: $${json[i].cost}</div>
              <button class="deleteAvailable" id="${
                json[i].id
              }">Delete Lesson</button>
            </div>
          </div>
  `;
  }
  something.innerHTML = html;
};

availableLessonButton.addEventListener("click", () => {
  getAvailableLessons();
});

// Populating Available Lessons
const claimedLessonButton = document.getElementById("view-taken");

const getClaimedLessons = async () => {
  const dataWeAreSending = await fetch(
    "http://localhost:3000/instructor/claimed-lessons",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const json = await dataWeAreSending.json();
  let html = "";

  for (let students = 0; students < json.length; students++) {
    for (let l = 0; l < json[students].lessons.length; l++) {
      html += `
            <div id="sample-card">
            <div id="card-title">Lesson with ${json[students].firstName} ${
        json[students].lastName
      }</div>
            <div id="card-body">
            <div class="card-item" id="card-date">Date: ${getFormattedDate(
              json[students].lessons[l].date
            )}</div>
              <div class="card-item" id="card-start-time">Start Time: ${getFormattedTime(
                json[students].lessons[l].startTime
              )}</div>
              <div class="card-item" id="card-stop-time">Start Time: ${getFormattedTime(
                json[students].lessons[l].stopTime
              )}</div>
              <div class="card-item" id="card-cost">Cost: $${
                json[students].lessons[l].cost
              }</div>
              <div id="card-buttons">
                <button class="deleteClaimed" id="${
                  json[students].lessons[l].id
                }">Delete Lesson</button>
                <button class="removeStudent" id="${
                  json[students].lessons[l].id
                }">Remove Student</button>
              </div>
            </div>
          </div>
  `;
    }
  }
  something.innerHTML = html;
};

claimedLessonButton.addEventListener("click", () => {
  getClaimedLessons();
});

// Creating a New Lesson
createLessonButton.addEventListener("click", () => {
  openModal();
});

const createNewLesson = async () => {
  const data = {
    date: date.value,
    start: startTime.value,
    stop: stopTime.value,
    cost: cost.value,
  };

  const dataWeAreSending = await fetch(
    "http://localhost:3000/instructor/create-lesson",
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

form.addEventListener("submit", (e) => {
  e.preventDefault;
  createNewLesson();
  alert("Lesson Created!");
  getAvailableLessons();
});

// Sign Out Functionality
const signOutButton = document.getElementById("sign-out-btn");

const logOut = async () => {
  const fetchLogOut = await fetch("http://localhost:3000/signin/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await fetchLogOut.json();
  if (json.message == "Logout Success") {
    alert("Successfully Logged Out");
    window.location.href = "/home";
  }
};

// Sign Out of the Page
signOutButton.addEventListener("click", async () => {
  logOut();
});
