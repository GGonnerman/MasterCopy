let colors;
let toBeCopied;
let colorHeader;

function preload() {
	colors = loadJSON("colors.json");
}

function setup() {
	noCanvas();

	colorHeader = document.getElementById("colorName");
	toBeCopied  = document.getElementById("hexes");
	changeValues("White", "#FFFFFF", "#000000");
}

function draw() {}

function mousePressed() {
	let randomColor = colors.colors[Math.floor(Math.random() * colors.colors.length)];
	let colorsName  = randomColor.color.replace(/[A-Z]/g, (c) => " " + c);
	let oppositeColor = getOppositeColor(randomColor.hex);
	changeValues(colorsName, randomColor.hex, oppositeColor);
}

function changeValues(color, hex, opposite) {
	document.body.style.background = hex;
	colorHeader.innerHTML          = color;
	colorHeader.style.color        = hex;
	colorHeader.style.background   = opposite;
	toBeCopied.innerHTML           = `${color} - ${hex} ${hexToRGB(hex)} Opposite Color - ${opposite} ${hexToRGB(opposite)}`;
	toBeCopied.style.background    = hex;

}

function keyPressed() {
	if (keyCode === 67) {
		let hexes = toBeCopied;
		hexes.select();
		document.execCommand("copy");
	}
}

function getOppositeColor(value) {
	let rgb = value.slice(1).match(/.{2}/g);
	for (let i = 0; i < 3; i++) {
		rgb[i] = (255 - parseInt(rgb[i], 16)).toString(16).toUpperCase();
		if (rgb[i].length < 2) {
			rgb[i] += rgb[i];
		}
	};
	return `#${rgb.join("")}`;
}

function hexToRGB(value) {
	value = value.toString().replace(/#/, "").match(/.{2}/g);
	return `(${parseInt(value[0], 16)}, ${parseInt(value[1], 16)}, ${parseInt(value[2], 16)})`;
}