function getEpisodes() {
  var container = document.querySelector(".container");
  // container.innerHTML = "";
  fetch(`https://rickandmortyapi.com/api/episode`)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      data.results.map((results) => {
        container.innerHTML =
          `
       <div> 
       Name: ` +
          results.name +
          ` 
       </div>
       `;
      });
    });
}
getEpisodes();
