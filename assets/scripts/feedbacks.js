const uri = "https://nodeapi-rovy.onrender.com/api/feedbacks";

function getAll() {
  var feedbackContainer = document.querySelector(".feedbackContainer");
  feedbackContainer.innerHTML = "";
  try {
    fetch(uri)
      .then((req) => req.json())
      .then((res) => {
        console.log(res);
        res.map((res) => {
          feedbackContainer.innerHTML +=
            `
          <div class='cardFeedback'>
        <h2>User Name: "` +
            res.userName +
            `"</h2>

        <h4>Target: "` +
            res.target +
            `"</h4>

        <h4>Feedback: "` +
            res.message +
            `"</h4>
            </div>
        `;
        });
      });
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

getAll();

const form = document.querySelector("#formELEMENT");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  console.log(data);

  fetch(uri, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((req) => req.json())
    .then((res) => {
      console.log(res);
      getAll();
    });
});
