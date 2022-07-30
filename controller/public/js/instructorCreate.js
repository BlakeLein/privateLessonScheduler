const date = document.getElementById("date");
const startTime = document.getElementById("start-time");
const stopTime = document.getElementById("stop-time");
const cost = document.getElementById("cost");
const submitButton = document.getElementById("submit");

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

submitButton.addEventListener("click", () => {
  console.log("Hi");
  createNewLesson();
});
