const img = document.getElementById("pokemon-image");

fetch("https://pokeapi.co/api/v2/pokemon/ditto", {mode: "cors"})
    .then(response => {
        if (!response.ok) {
            throw new Error("Error Code: " + response.status);
        }
        return response.json();
    })
    .then(response => img.src = response.sprites.front_default)
    .catch(error => console.log(error));