let pokedex;

window.onload = function () {

	const table = document.createElement("table");
	table.id = "table";
	document.body.appendChild(table);

	pokedex = JSON.parse(unprocessedPokedex);

	searchPokemon();

}

function randomPokemon() {
	window.location.href = `/pokemon-page/pokemon.html?pokemon=${Math.floor(Math.random() * 809) + 1}`;
}

function searchPokemon() {
	const prefix = document.getElementById("searchBar").value.toLowerCase();
	document.getElementById("table").innerHTML = '';

	switch (document.getElementById("searchType").selectedIndex) {
		case 1: // Seach by type
			loadPokemon(function (pokemon) {
				return pokemon.type.some(type => type.toLowerCase().startsWith(prefix));
			});
			break;
		default: // Search by name
			loadPokemon(function (pokemon) {
				return pokemon.name.toLowerCase().startsWith(prefix);
			});
	}
}

function loadPokemon(filter) {
	const table = document.getElementById("table");
	const columnCount = 3;

	let pokemonCount = 0;
	let tr;
	for (let i = 0; i < pokedex.length; i++) {
		let pokemon = pokedex[i];

		// Check if pokemon passes search filter
		if (filter != null && !filter(pokemon)) {
			continue;
		}

		// If first iteration, or a row is complete
		if (!pokemonCount || pokemonCount == columnCount) {
			pokemonCount = 1;
			tr = document.createElement("tr");
			table.appendChild(tr);
		} else {
			pokemonCount += 1;
		}

		// Create individual cell
		let pokemonColumn = document.createElement("td");
		pokemonColumn.id = pokemon.name.toLowerCase();

		// Create link
		let nameUrl = document.createElement("a");
		nameUrl.href = `/pokemon-page/pokemon.html?pokemon=${pokemon.id}`;

		// Image wrapper
		let imageWrapper = document.createElement("div");
		imageWrapper.className = "img-wrapper";

		// Create image
		let photo = document.createElement("img");
		photo.src = pokemon.images.full;

		imageWrapper.append(photo);

		// Create line break
		let newLine = document.createElement("br");

		// Add elements to link
		nameUrl.append(imageWrapper, newLine);

		// Add text to the end of the link
		nameUrl.innerHTML += `${parseInt(pokemon.id)}. ${pokemon.name}`;

		// Add link to cell
		pokemonColumn.appendChild(nameUrl);

		// Add cell to row
		tr.appendChild(pokemonColumn);

	}
	// Add incomplete row to table, if there is one
	if (pokemonCount > 0) {
		table.appendChild(tr);
	}

	// If nothing has been added
	if (table.innerHTML == '') {
		table.innerHTML = "No results found"
	}
}