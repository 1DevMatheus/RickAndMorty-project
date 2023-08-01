const charsContainer = document.querySelector(".container");
const searchInput = document.querySelector("#name");
const speciesFilter = document.querySelector("#species");
const genderFilter = document.querySelector("#gender");
const statusFilter = document.querySelector("#status");
const loadMoreButton = document.querySelector("#load-more");

const URL = "https://rickandmortyapi.com/api";

async function getCharacters({ name, species, genre, status, page = 1 }) {
  const response = await fetch(
    `${URL}/character?name=${name}&species=${species}&gender=${genre}&status=${status}&page=${page}`
  );
  const characters = await response.json();
  return characters.results;
}

const defaultFilters = {
  name: "",
  species: "",
  genre: "",
  status: "",
  page: 1,
};

async function render({ characters, locations, episodes }) {
  characters.forEach((character) => {
    return (charsContainer.innerHTML += `
    <div class="char">
      <img src="${character.image}" alt="">
      <div class="char-info">
        <h3>${character.name}</h3>
        <span>${character.species}</span>
      </div>
    </div>
    `);
  });
}

function handleFilterChange(type, e) {
  return async () => {
    defaultFilters[type] = e.target.value;
    charsContainer.innerHTML = "";
    const characters = await getCharacters(defaultFilters);
    render({ characters });
  };
}

function addListeners() {
  speciesFilter.addEventListener("change", (e) => {
    handleFilterChange("species", e)();
  });

  genderFilter.addEventListener("change", async (e) => {
    handleFilterChange("genre", e)();
  });

  statusFilter.addEventListener("change", async (e) => {
    handleFilterChange("status", e)();
  });

  searchInput.addEventListener("keydown", async (e) => {
    handleFilterChange("name", e)();
  });

  loadMoreButton.addEventListener("click", async () => {
    defaultFilters.page += 1;
    const characters = await getCharacters(defaultFilters);
    render({ characters });
  });
}

function resetFilters() {
  searchInput.value = "";
  speciesFilter.value = "";
  genderFilter.value = "";
  statusFilter.value = "";
}

async function main() {
  const characters = await getCharacters(defaultFilters);
  resetFilters();
  addListeners();
  render({ characters });
}

main();
