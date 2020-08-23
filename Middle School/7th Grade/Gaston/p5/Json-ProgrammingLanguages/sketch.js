let searchUrl = 'https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&format=json&search=';
let contentUrl = 'https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&explaintext=1&titles=';
let information;
let lang;
let randomLanguage;
let randomNumber;
let name;
let failure;

function preload() {
	information = loadJSON("programmingInfo.json");
}

function setup() {
	noCanvas();
	lang = information.languages;
	failure = 0;
}

function draw() {}

function keyPressed() {
	failure = 0;
	randomLanguage = lang.filter(x => x.charCodeAt(0) === keyCode);
	randomNumber = floor(random(randomLanguage.length - 1));
	name = randomLanguage[randomNumber];
	if (randomLanguage.length === 0) {
		console.log("No programming language found with selected key");
	} else {
		searchWiki(randomLanguage[randomNumber]);
	}
}

function searchWiki(word) {
	let url = searchUrl + name;
	loadJSON(url, gotSearch);
}

function gotSearch(data) {
	let url = contentUrl + data[0].replace(/\s/g, "_");
	loadJSON(url, gotInfo);
}

function gotInfo(data) {
	let preview = data.query.pages[Object.keys(data.query.pages)[0]].extract;
	if (preview === undefined) {
		console.log(`Couldn't find a page about ${name}`)
	} else {
		preview = preview.split(/\n\n/)[0];
		if (!preview.match(/may refer to/) && ((preview.match("computer")) || (preview.match("programming")) || (preview.match("file")) || (preview.match("web")))) {
			console.log(`Your preview about ${name}\n${preview}`);
		} else {
			if (failure === 0) {
				loadJSON(contentUrl + `${name.replace(/\s+/, "_")} (programming language)`, gotInfo);
				failure++;
			} else {
				console.log(`Couldn't find a page about ${name}`);
			}
		}
	}
}