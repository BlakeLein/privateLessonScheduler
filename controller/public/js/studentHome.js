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
  console.log("Hi");
  logOut();
});
