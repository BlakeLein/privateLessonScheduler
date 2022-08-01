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

// Allows the modal to close and overlay to disable when you click outside
overlay.addEventListener("click", () => {
  modal.classList.remove("active");
  overlay.classList.remove("active");
});

// Closes the modal after it's opened
closeModalButton.addEventListener("click", () => {
  closeModal();
});

// Functions to open/close modal
const openModal = () => {
  // if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
};
const closeModal = () => {
  // if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
};

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
});
