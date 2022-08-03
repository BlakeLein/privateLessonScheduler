const something = document.querySelector("#something");

something.addEventListener("click", async (e) => {
  console.log("Hit this route");
  console.log(e);
  try {
    e.preventDefault();

    if (e.target.className === "claim") {
      let primaryKey = e.target.id;
      console.log(e.target.id);

      const claimingItem = await fetch(
        `http://localhost:3000/student/claim-lesson/${primaryKey}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Lesson Claimed");
      getLessonsFromInstructor();
    } else if (e.target.className === "cancel") {
      let primaryKey = e.target.id;
      console.log(e.target.id);

      const claimingItem = await fetch(
        `http://localhost:3000/student/cancel-lesson/${primaryKey}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Lesson Canceled");
      viewMyLessons();
    }
  } catch (error) {
    console.log(error);
  }
});

// Route/Function to get lessons that are available
const getLessonsFromInstructor = async () => {
  const dataWeAreSending = await fetch(
    "http://localhost:3000/student/lessons-from-instructor",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  // This json contains an array of objects for all lessons created that is tied to this teacher account
  const json = await dataWeAreSending.json();

  let html = "";

  for (let i = 0; i < json.length; i++) {
    html += `
            <div id="sample-card">
            <div id="card-title">Date: ${json[i].date}</div>
            <div id="card-body">
              <div class="card-item" id="card-start-time">Start Time: ${json[i].startTime}</div>
              <div id="card-stop-time">Start Time: ${json[i].stopTime}</div>
              <div id="card-cost">Cost: ${json[i].cost}</div>
              <button class="claim" id="${json[i].id}">Claim Lesson</button>
            </div>
          </div>
  `;
  }
  something.innerHTML = html;
};
const veiwAvailableLessons = document.getElementById("view-available");

veiwAvailableLessons.addEventListener("click", () => {
  console.log("Click");
  getLessonsFromInstructor();
});

// View My Lessons
const viewMyLessons = async () => {
  const dataWeAreSending = await fetch(
    "http://localhost:3000/student/view-my-lessons",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  // This json contains an array of objects for all lessons created that is tied to this teacher account
  const json = await dataWeAreSending.json();
  console.log(json);
  let html = "";

  for (let i = 0; i < json.length; i++) {
    html += `
            <div id="sample-card">
            <div id="card-title">Date: ${json[i].date}</div>
            <div id="card-body">
              <div class="card-item" id="card-start-time">Start Time: ${json[i].startTime}</div>
              <div id="card-stop-time">Start Time: ${json[i].stopTime}</div>
              <div id="card-cost">Cost: ${json[i].cost}</div>
              <button class="cancel" id="${json[i].id}">Cancel Lesson</button>
            </div>
          </div>
  `;
  }
  something.innerHTML = html;
};
const myLessonsButton = document.getElementById("view-my-lessons");

myLessonsButton.addEventListener("click", () => {
  console.log("Click");
  viewMyLessons();
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
  alert("Successfully Logged Out");
  window.location.href = "/home";
};

signOutButton.addEventListener("click", async () => {
  logOut();
});
