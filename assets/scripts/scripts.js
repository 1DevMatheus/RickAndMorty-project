function showLoading() {
  var box = document.getElementById("container");
  box.classList.add("hidden");

  var btnContainer = document.getElementById("btnContainer");
  btnContainer.classList.add("hidden");

  var div = document.createElement("div");
  div.classList.add("loader");

  document.body.appendChild(div);
  setTimeout(() => hideLoading(), 1500);
}

function hideLoading() {
  var btnContainer = document.getElementById("btnContainer");
  btnContainer.classList.remove("hidden");

  var container = document.getElementById("container");
  container.classList.remove("hidden");
  const loadings = document.getElementsByClassName("loader");
  if (loadings.length) {
    loadings[0].remove();
  }
}

var page = 1;
function nextPage() {
  showLoading();
  page++;
  getPersonagens();
  if (page > 41) {
    alert("this is the last page");
    page--;
  }

  console.log(page);
}

function prevPage() {
  page--;
  if (page >= 1) {
    showLoading();
  }

  getPersonagens();
  if (page < 1) {
    alert("this is the first page");
    page++;
  }
  console.log(page);
}

console.log(page);
function getPersonagens() {
  var container = document.querySelector(".container");
  container.innerHTML = "";
  fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      console.log(page);
      data.results.map((results) => {
        container.innerHTML +=
          `
        <div> <img src=` +
          results.image +
          `>
        <header>Name: ` +
          results.name +
          `</header>
         <main>Gender: ` +
          results.gender +
          `
         <br>

        
         Status: ` +
          results.status +
          `
         <br>
        Location: ` +
          results.location.name +
          `
         <br>
        Origin: ` +
          results.origin.name +
          `
        <br>
        <span> number of episodes appeared  (${results.episode.length}) </span>
<main>
        </div>
         `;
      });
    });
}
getPersonagens();
