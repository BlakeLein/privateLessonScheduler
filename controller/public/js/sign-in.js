const username = document.getElementById("username");
const password = document.getElementById("password");
const accountType = document.getElementById("account-type");
const submitButton = document.getElementById("submit");

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
};

submitButton.addEventListener("click", () => {
  if (accountType.value == "Student") {
    sendStudentData();
  } else if (accountType.value == "Instructor") {
    sendInstructorData();
  }
});
