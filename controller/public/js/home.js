const submit = document.getElementById("submit");

const sendData = async () => {
  const input = document.getElementById("name").value;
  const data = {
    name: input,
  };
  const dataWeAreSending = await fetch(
    "http://localhost:3030/restaurants/create_restaurant",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  console.log(dataWeAreSending);
  const json = await dataWeAreSending.json();
  console.log(json);
};

// submit.onclick = () => sendData();
