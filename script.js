const img = document.getElementById("pokemon-image");
const pkmnName = document.querySelector("#name span");
const pokedexID = document.querySelector("#pokedex-id span");
const pkmnHeight = document.querySelector("#height span");
const pkmnWeight = document.querySelector("#weight span");
const pkmnTypes = document.querySelector("#type span");
const searchBar = document.getElementById("pkmn-search");
const searchBtn = document.getElementById("search-btn");
const dataSpans = document.querySelectorAll("ul li span");


fetchData("pikachu");

searchBtn.addEventListener("click", () => {
    dataSpans.forEach(span => span.textContent = "");
    fetchData(searchBar.value);
});

function fetchData(pokemonName) {
    fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName, {mode: "cors"})
    .then(response => {
        if (!response.ok) {
            throw new Error("Error Code: " + response.status);
        }
        return response.json();
    })
    .then(response => showData(response))
    .catch(error => console.log(error));
}

function showData(pkmnObject) {
    console.log(pkmnObject);
    const name = pkmnObject.name;
    const id = pkmnObject.id;
    const imgSrc = pkmnObject.sprites.front_default;
    const heightInM = pkmnObject.height * 0.1;
    const weightInKg = pkmnObject.weight * 0.1;
    const types = pkmnObject.types;
    let typesString = "";

    img.src = imgSrc;
    pkmnName.textContent += ` ${name.charAt(0).toUpperCase() + name.slice(1)}`;
    pokedexID.textContent += ` ${id}`;
    pkmnHeight.textContent += ` ${heightInM.toFixed(1)} m`;
    pkmnWeight.textContent += ` ${weightInKg.toFixed(1)} kgs`;

    for (let i = 0; i < types.length; i++) {
        typesString += types[i].type.name.charAt(0).toUpperCase() + types[i].type.name.slice(1);
        if (i != types.length - 1) {
            typesString += ", ";
        }
    }
    pkmnTypes.textContent += ` ${typesString}`;

}