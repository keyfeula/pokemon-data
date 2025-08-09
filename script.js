const img = document.getElementById("pokemon-image");
const pkmnName = document.querySelector("#name span");
const pokedexID = document.querySelector("#pokedex-id span");
const pkmnHeight = document.querySelector("#height span");
const pkmnWeight = document.querySelector("#weight span");
const pkmnTypes = document.querySelector("#type span");
const searchBar = document.getElementById("pkmn-search");
const searchBtn = document.getElementById("search-btn");
const dataSpans = document.querySelectorAll("ul li span");
const errorMsg = document.querySelector(".error-message");


fetchData("pikachu");
searchBar.focus();

searchBtn.addEventListener("click", () => {
    if (searchBar.value === "") {
        errorMsg.textContent = "Enter a Pokemon name!";
        return;
    }
    fetchData(searchBar.value);
});

function fetchData(pokemonName) {
    fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName.toLowerCase(), {mode: "cors"})
    .then(response => {
        if (!response.ok) {
            if (response.status === 404) {
                errorMsg.textContent = "404 Pokemon Not Found!";
            }
            throw new Error("Error Code: " + response.status);
        }
        return response.json();
    })
    .then(response => showData(response))
    .catch(error => console.log(error));
}

function showData(pkmnObject) {
    dataSpans.forEach(span => span.textContent = "");
    errorMsg.textContent = "";
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