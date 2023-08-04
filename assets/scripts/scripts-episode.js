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
  getEpisodes();
  if (page > 3) {
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

  getEpisodes();
  if (page < 1) {
    alert("this is the first page");
    page++;
  }
  console.log(page);
}

function getEpisodes() {
  var container = document.querySelector(".epcontainer");
  container.innerHTML = "";
  fetch(`https://rickandmortyapi.com/api/episode?page=${page}`)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      data.results.map((results) => {
        container.innerHTML +=
          `
       <div class="data"> 
        
       <div>
       Episode: ` +
          results.episode +
          `
       </div>
       <div>
        Name: ` +
          results.name +
          `
        </div>
         <div>
         Launch date: ` +
          results.air_date +
          `
         </div>
       </div>
       `;
      });
    });
}
getEpisodes();
