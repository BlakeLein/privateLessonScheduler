const signInButton = document.getElementById("signInButton");

signInButton.addEventListener("click", () => {
  window.location.href = "/signin";
});

function myFunction() {
  const x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}