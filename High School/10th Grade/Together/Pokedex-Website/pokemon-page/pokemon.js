const typeColors = {
	"bug": ["267539", "6d9b75"],
	"dark": ["1a3559", "65748b"],
	"dragon": ["c7ab37", "cdba74"],
	"electric": ["ffe733", "ecdd71"],
	"fairy": ["ef509d", "e583b2"],
	"fighting": ["f86b1c", "ec9669"],
	"fire": ["f84330", "eb7b74"],
	"flying": ["1ec1ef", "70c9e4"],
	"ghost": ["530f10", "885f5f"],
	"grass": ["81c124", "a3c96b"],
	"ground": ["9d6632", "b39171"],
	"ice": ["8ed7ed", "a9d4e2"],
	"normal": ["aea77b", "bbb69a"],
	"psychic": ["784a8b", "9b7fa5"],
	"poison": ["89526f", "a58394"],
	"rock": ["6e645a", "938c87"],
	"steel": ["73858c", "93a0a5"],
	"water": ["15a9e5", "6abae0"]

}

let pokemon;
const pokedex = JSON.parse(unprocessedPokedex);

window.onload = function () {

	pokemon = getQueryVariable("pokemon");

	if (pokemon == "random") {
		pokemon = generateRandomPokemon();
	} else {
		pokemon = parseInt(pokemon)
		if ( isNaN(pokemon) || pokemon < 1 ) { // If id doesnt exist or is less than 1
			pokemon = 1;
		} else if ( pokemon > 809 ) { // If id is above max
			pokemon = 809;
		}
		pokemon = JSON.parse(unprocessedPokedex)[pokemon - 1];
	}

	get("animatedSprite").src = pokemon.id >= 650 ? pokemon.images.sprite : pokemon.images.animatedSprite;

	get("title").textContent = `${pokemon.name} (${parseInt(pokemon.id).toString().padStart(2, '0')})`;

	get("shorthand").textContent = `The "${pokemon.category}" Pokemon`;

	get("description").textContent += pokemon.description;

	generateTypeColors();

	get("males").textContent = pokemon.malePerc ? pokemon.malePerc : "N/A";

	get("females").textContent = pokemon.femalePerc ? pokemon.femalePerc : "N/A";

	get("eggGroups").textContent = pokemon.eggGroups;

	get("height").textContent = pokemon.height;

	get("weight").textContent = pokemon.weight;

	createEvolutionTable();

	get("fullImage").src = pokemon.images.full;

	createBackgroundIcons();

	setBackgroundColor();

	setAnimatedSpriteLocation();

	createStatsCanvas();

	correctTextSize();

	checkEvolutionLength();

	checkFullImageHeight();

	initializeButtons();

	window.addEventListener("resize", function () {
		createStatsCanvas();
		correctTextSize();
		checkEvolutionLength();
		checkFullImageHeight();
	}, true);
}

function correctTextSize() {
	const descriptionDiv = get("descriptionDiv");
	const description = get("description");

	let fullHeight = descriptionDiv.clientHeight * .5;
	let height = description.scrollHeight;
	let currSize = 1;

	if (height > fullHeight) {

		while (fullHeight > height) {
			currSize += 0.1;
			description.style.fontSize = `${currSize}px`;
			height = description.clientHeight;
		}

		return;
	}

	if (fullHeight > height) {

		while (fullHeight > height) {
			currSize += 0.1;
			description.style.fontSize = `${currSize}px`;
			height = description.clientHeight;
		}

		return;
	}

}

function get(id) {
	return document.getElementById(id);
}

function p(prop) {
	return pokedex[Math.floor(Math.random() * 809) + 1][prop]
}

function generateRandomPokemon() {
	return {
		"name": p("name"),
		"id": p("id"),
		"images": {
			"full": p("images")["full"],
			"sprite": p("images")["sprite"],
			"animatedSprite": p("images")["animatedSprite"],
			"thumbnail": p("images")["thumbnail"]
		},
		"description": p("description"),
		"category": p("category"),
		"height": p("height"),
		"weight": p("weight"),
		"type": p("type"),
		"evolutions": {
			"pre": p("evolutions")["pre"],
			"curr": p("evolutions")["curr"],
			"post": p("evolutions")["post"]
		},
		"baseStats": {
			"HP": p("baseStats")["HP"],
			"Attack": p("baseStats")["Attack"],
			"Defense": p("baseStats")["Defense"],
			"Sp. Attack": p("baseStats")["Sp. Attack"],
			"Sp. Defense": p("baseStats")["Sp. Defense"],
			"Speed": p("baseStats")["Speed"]
		},
		"malePerc": p("malePerc"),
		"femalePerc": p("femalePerc"),
		"eggGroups": p("eggGroups")
	}
}

function initializeButtons() {
	const buttonWrapperButtons = get("buttonWrapper").children;
	const color = typeColors[pokemon.type[0].toLowerCase()][1];

	for (let i = 0; i < buttonWrapperButtons.length; i++) {
		let button = buttonWrapperButtons[i];

		button.style.border = `0.4rem solid #${color}`;
		button.style.color = color;
	}

}

function setBackgroundColor() {
	document.body.style = `background-color: #${typeColors[pokemon.type[0].toLowerCase()][0]}80`;
}

function generateTypeColors() {
	const types = get("types");
	for (let i = 0; i < pokemon.type.length; i++) {
		let p = document.createElement("p");
		p.textContent = pokemon.type[i];
		p.style = `color: #${typeColors[pokemon.type[i].toLowerCase()][0]}`
		types.append(p);
		if (i == pokemon.type.length - 1) {
			break;
		}
		types.innerHTML += ", ";
	}
}

function createEvolutionTable() {
	const evolutions = get("evolutionLine");
	if (pokemon.evolutions.pre) {
		let cell = createLinkedCell(pokemon.evolutions.pre, "preEvolution");
		evolutions.append(cell);
		addArrow();
	}
	if (pokemon.evolutions.pre != "" || pokemon.evolutions.post.length > 0) {
		let cell = createLinkedCell(pokemon.evolutions.curr);
		evolutions.append(cell);
	}
	if (pokemon.evolutions.post.length > 0) {
		addArrow();
		for (let i = 0; i < pokemon.evolutions.post.length; i++) {
			cell = createLinkedCell(pokemon.evolutions.post[i], "postEvolution");
			evolutions.append(cell);
		}
	}
}

function checkFullImageHeight() {
	if (pokemon.evolutions.pre == "" && pokemon.evolutions.post.length == 0) {
		get("fullImageWrapper").style.gridRowEnd = 4;
		get("fullImage").style.height = `calc(90% - 2em)`;
	}
}

function checkEvolutionLength() {
	const evolutionLine = get("evolutionLineWrapper");
	const partCellSize = get("wrapper").clientWidth * (2 / 5);
	if (evolutionLine.clientWidth <= partCellSize) {
		evolutionLine.style.gridColumn = "3 / 6";
	} else {
		get("statsTableWrapper").style.gridRow = "2 / 3";
		get("fullImageWrapper").style.gridColumn = "1 / 6";
		evolutionLine.style.gridColumn = "1 / 6";
	}
}

function addArrow() {
	const evolutions = get("evolutionLine");
	let cell = document.createElement("td");
	cell.className = "arrow";
	let arrow = document.createElement("img");
	arrow.src = "https://raw.githubusercontent.com/GGonnerman/Pokemon-Data/master/addons/arrow.png";
	cell.append(arrow);
	evolutions.append(cell);
}

function createLinkedCell(id, className) {
	let cell = document.createElement("td");
	cell.className = className;
	let link = document.createElement("a");
	link.href = `/pokemon-page/pokemon.html?pokemon=${id}`;
	let evolution = document.createElement("img");
	evolution.src = `https://raw.githubusercontent.com/GGonnerman/Pokemon-Data/master/thumbnails/${id}.png`;
	evolution.className = "currentEvolution";
	link.append(evolution);
	cell.append(link);
	return cell;
}

function createBackgroundIcons() {
	let size = 25;
	const locations = [
		["top", "left"],
		["top", "right"],
		["bottom", "right"],
		["bottom", "left"]
	];

	for (let i = 0; i < locations.length; i++) {

		let link = document.createElement("a");
		link.href = "/pokemon-page/pokemon.html?pokemon=random";

		let image = document.createElement("img");
		image.src = `https://raw.githubusercontent.com/GGonnerman/Pokemon-Data/master/icons/${pokemon.type[0].toLowerCase()}.png`;
		image.className = "backgroundIcon";

		image.style += `
		width: ${size}vmin;
		height: ${size}vmin;
		${locations[i][0]}: -${size / 2}vmin;
		${locations[i][1]}: -${size / 2}vmin;
		`;

		link.append(image);
		document.body.prepend(link);
	}

	size = 45;

	let image = document.createElement("img");
	image.src = `https://raw.githubusercontent.com/GGonnerman/Pokemon-Data/master/icons/${pokemon.type[0].toLowerCase()}.png`;
	image.className = "backgroundIcon";

	image.style = `
		width: ${size}vmin;
		height: ${size}vmin;
		top: calc(40% - ${size/2}vmin);
		left: calc(50% - ${size/2}vmin);
		`;

	document.body.prepend(image);
}

function setAnimatedSpriteLocation() {
	let sprite = document.getElementById("animatedSprite");
	let horizSpace = 10;
	let vertSpace = 0;
	let span = document.getElementById("title");
	sprite.style.bottom = `${window.innerHeight - span.getBoundingClientRect().bottom + vertSpace}px`;
	sprite.style.left = `${span.getBoundingClientRect().right + horizSpace}px`;
}

function createStatsCanvas() {
	let canvas = document.getElementById('display');

	// Set size attributes
	canvas.style.width = "100%";
	canvas.style.height = "100%";
	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
	const width = canvas.width;
	const height = canvas.height;

	const ctx = document.getElementById("display").getContext("2d");

	ctx.fillStyle = "#f5f5f580";
	ctx.rect(0, 0, width, height);
	ctx.fill();

	ctx.lineWidth = "4";
	ctx.strokeStyle = "black";

	ctx.font = `bold 15px 'Fira Code'`;

	// Draw surrounding boxes
	ctx.beginPath();
	ctx.rect(2, 2, width - 4, height - 25);
	ctx.rect(2, 2, width - 4, height - 4);
	ctx.stroke();

	const halfHeight = height * (3 / 4);

	const entries = Object.entries(pokemon.baseStats);
	const max = Math.max(...Object.values(pokemon.baseStats));

	for (let i = 0; i < entries.length; i++) {
		let key = entries[i][0];
		let value = entries[i][1];
		let currWidth = (2 * i + 1) *
			(width / 13);
		let currHeight = height - ((value / max) * halfHeight);
		ctx.beginPath();
		ctx.fillStyle = 'black';
		ctx.fillText(value, (currWidth + width / 26) - (value.toString().length * 5), currHeight -
			4);
		ctx.fillText(key, (currWidth + width / 26) - (key.toString().length * 5), height - 6);
		ctx.stroke();
		switch (key.toLowerCase()) {
			case "hp":
				ctx.fillStyle = "#FF0000";
				break;
			case "attack":
				ctx.fillStyle = "#F08030";
				break;
			case "defense":
				ctx.fillStyle = "#F8D030";
				break;
			case "sp. attack":
				ctx.fillStyle = "#6890F0";
				break;
			case "sp. defense":
				ctx.fillStyle = "#78C850";
				break;
			case "speed":
				ctx.fillStyle = "#F85888";
				break;
			default:
				ctx.fillStyle = "black"
		}
		ctx.rect(currWidth, currHeight, width / 13, (value / max * halfHeight) - 25);
		ctx.fill();
	}
}

function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) {
			return pair[1];
		}
	}
	return false;
}

function goHome() {
	window.location.href = `/`;
}

function randomPokemon() {
	window.location.href = `/pokemon-page/pokemon.html?pokemon=${Math.floor(Math.random() * 809) + 1}`;
}

function randomEverything() {
	window.location.href = "/pokemon-page/pokemon.html?pokemon=random";
}
