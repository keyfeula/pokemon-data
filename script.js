fetch("https://pokeapi.co/api/v2/pokemon/ditto", {mode: "cors"})
    .then(response => {
        if (!response.ok) {
            throw new Error("Error Code: " + response.status);
        }
        return response.json();
    })
    .then(response => console.log(response))
    .catch(error => console.log(error));