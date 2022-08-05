const username = document.getElementById("username");
const password = document.getElementById("password");
const accountType = document.getElementById("account-type");
const form = document.getElementById("form");

const sendStudentData = async () => {
  const data = {
    user: username.value,
    pass: password.value,
  };
  const dataWeAreSending = await fetch(
    "http://localhost:3000/signin/student-sign-in",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const json = await dataWeAreSending.json();
  if (json.message == "Please enter username and password.") {
    alert("Please enter a Username and Password");
  } else if (json.message == "That username is incorrect.") {
    alert("Please enter a registered username.");
  } else if (json.message == "That password is incorrect.") {
    alert("Incorrect password.");
  } else {
    window.location.href = "/student/home";
  }
};

const sendInstructorData = async () => {
  const data = {
    user: username.value,
    pass: password.value,
  };
  const dataWeAreSending = await fetch(
    "http://localhost:3000/signin/instructor-sign-in",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const json = await dataWeAreSending.json();
  if (json.message == "Please enter username and password.") {
    alert("Please enter a Username and Password");
  } else if (json.message == "That username is incorrect.") {
    alert("Please enter a registered username.");
  } else if (json.message == "That password is incorrect.") {
    alert("Incorrect password.");
  } else {
    window.location.href = "/instructor/home";
  }
};

form.addEventListener("submit", (e) => {
  if (accountType.value == "Student") {
    e.preventDefault();
    sendStudentData();
  } else if (accountType.value == "Instructor") {
    e.preventDefault();
    sendInstructorData();
  }
});
