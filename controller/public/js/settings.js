// Buttons and Input Fields
const changeUserButton = document.getElementById("change-email");
const changeUserInput = document.getElementById("change-user-input");

const changePasswordButton = document.getElementById("change-password");
const changePasswordInput = document.getElementById("change-password-input");

const changeInstrumentButton = document.getElementById("change-instrument");
const changeInstrumentInput = document.getElementById(
  "change-instrument-input"
);

const changeInstructorButton = document.getElementById("change-instructor");
const changeInstructorInput = document.getElementById(
  "change-instructor-input"
);

const signOutButton = document.getElementById("sign-out-btn");

// Logout Functionality
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

signOutButton.addEventListener("click", () => {
  logOut();
});

// Change Username
const changeUsername = async () => {
  const data = {
    newUsername: changeUserInput.value,
  };
  const sendNewUsername = await fetch(
    "http://localhost:3000/settings/change-username",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const json = await sendNewUsername.json();
  if (json === "changed student email") {
    alert("Successfully changed Email. You will now be logged out.");
    logOut();
  } else if (json === "changed instructor email") {
    alert("Successfully changed instructor email. You will now be logged out.");
    logOut();
  }
};

changeUserButton.addEventListener("click", () => {
  if (
    confirm(
      `Are you sure you want to change your username to "${changeUserInput.value}"?`
    )
  ) {
    changeUsername();
  }
});

// Change Password
const changePassword = async () => {
  const data = {
    newPassword: changePasswordInput.value,
  };
  const sendNewPassword = await fetch(
    "http://localhost:3000/settings/change-password",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const json = await sendNewPassword.json();
  if (json === "changed student password") {
    alert("Successfully changed student password. You will now be logged out.");
    logOut();
  } else if (json === "changed instructor password") {
    alert(
      "Successfully changed instructor password. You will now be logged out."
    );
    logOut();
  }
};

changePasswordButton.addEventListener("click", () => {
  if (confirm(`Are you sure you want to change your password?`)) {
    changePassword();
  }
});

// Change Instrument
// Populate Instrument Options
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
    changeInstrumentInput.append(option);
  }
};
// Populate Instrument Options on Start-up
populateInstrumentOptions(listOfInstruments.sort());

// Change Instrument Functionality
const changeInstrument = async () => {
  const data = {
    newInstrument: changeInstrumentInput.value,
  };
  const sendNewInstrument = await fetch(
    "http://localhost:3000/settings/change-instrument",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const json = await sendNewInstrument.json();
  if (json === "changed student instrument") {
    alert(
      "Successfully changed student instrument. You will now be logged out."
    );
    logOut();
  } else if (json === "changed instructor instrument") {
    alert(
      "Successfully changed instructor instrument. You will now be logged out."
    );
    logOut();
  }
};

changeInstrumentButton.addEventListener("click", () => {
  if (
    confirm(
      `Are you sure you want to change your instrument to "${changeInstrumentInput.value}"?`
    )
  ) {
    changeInstrument();
  }
});

// Delete Account
const deleteButton = document.getElementById("delete-account");

const deleteAccount = async () => {
  const deleteThisAccount = await fetch(
    "http://localhost:3000/settings/delete-account",
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const json = await deleteThisAccount.json();
  if (json === "account deleted") {
    alert("Successfully deleted account. You will now be logged out.");
    logOut();
  }
};

deleteButton.addEventListener("click", () => {
  if (confirm(`Are you sure you want to delete your account?`)) {
    deleteAccount();
  }
});

// Change Instructor
const changeInstructor = async () => {
  const data = {
    newInstructor: changeInstructorInput.value,
  };
  const sendNewInstructor = await fetch(
    "http://localhost:3000/settings/change-instructor",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const json = await sendNewInstructor.json();
  if (json === "changed student instructor") {
    alert(
      "Successfully changed student instructor. You will now be logged out."
    );
    logOut();
  }
};

changeInstructorButton.addEventListener("click", () => {
  if (
    confirm(
      `Are you sure you want to change your instructor to "${changeInstructorInput.value}"?`
    )
  ) {
    changeInstructor();
  }
});
