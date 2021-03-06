var code;
var cardsBeingUsed = [];
var lastInputBox = 6;
var itemsAdded = [];
var itemCount = 0;

function copyToClipboard() {
    var copyText = document.getElementById("answer");
    copyText.select();
    document.execCommand("copy");
}

function addLine() {
    if (document.getElementById(lastInputBox).value !== '') {
        createNewElement('img');
        createNewElement('br');
        createNewElement('input');
        createNewElement('p');
        console.log('Added a new row');
        lastInputBox += 6;
    }
}

function createNewElement(type) {
    if (type === 'img' || type === 'input') {
        for (i = lastInputBox + 1; i < lastInputBox + 7; i++) {
            itemsAdded[itemCount] = document.createElement(type);
            if (type === 'img') {
                itemsAdded[itemCount].setAttribute("id", "img" + i);
                itemsAdded[itemCount].setAttribute("src", "https://goo.gl/EZ7bPY");
                itemsAdded[itemCount].setAttribute('style', 'padding: 2px;');
                document.getElementById("elementHolder").appendChild(itemsAdded[itemCount]);
            } else if (type === 'input') {
                itemsAdded[itemCount].setAttribute("type", "text");
                itemsAdded[itemCount].setAttribute("id", i);
                itemsAdded[itemCount].setAttribute("onchange", "changeImageToLink(" + i + ")");
                itemsAdded[itemCount].setAttribute('style', 'margin: 2px;');
                document.getElementById("elementHolder").appendChild(itemsAdded[itemCount]);
            }
            console.log('attempt');
            itemCount++;
        }
    } else {
        itemsAdded[itemCount] = document.createElement(type);
        document.getElementById("elementHolder").appendChild(itemsAdded[itemCount]);
        itemCount++;
    }
}

function formatLink(link) {
    return document.getElementById(link).value.replace('file/d/', 'thumbnail?id=').replace('/view', '');
}

function changeImageToLink(id) {
    addLine();
    var changeImage = formatLink(id);
    document.getElementById("img" + id).src = changeImage;
}

function compileAllCode() {
    cardsBeingUsed = [];
    for (i = 1; i < lastInputBox; i++) {
        if (document.getElementById(i).value !== '') {
            var isNotEmpty = formatLink(i);
            cardsBeingUsed.push(isNotEmpty);
            console.log(cardsBeingUsed.length);
        }
    }
    console.log(cardsBeingUsed);
    if (document.getElementById("chanceOrChest").value === "chest") {
        code = `<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Mr. Groth's Website</title>
    <script>
        var chest = [];

        function chooseCommunityChest() {
            if (typeof chest == "undefined" || chest.length < 1) {
                console.log("Shuffled");
`;
        for (i = 0; i < cardsBeingUsed.length; i++) {
            code = code + `chest.push("${cardsBeingUsed[i]}");
`;
        }
        code = code + `} 

            var lng = chest.length;
            var randomNumber = Math.floor(Math.random() * lng);
            console.log("Community Chest Card Chosen - " + randomNumber + " - " + chest[randomNumber]);
            document.getElementById("thecard").src = chest[randomNumber];
            chest.splice(randomNumber, 1);
        }

    </script>
    <style>
        img {
            width: 299px;
            height: 172px;
        }
        button {
            width: 299px;
            height: 28px;
        }

    </style>
</head>

<body>
    <img onclick="chooseCommunityChest()" id="thecard" src="https://drive.google.com/thumbnail?id=1o2cDBlmK7oqqEohoLDSIYcW949lfFRgI">
    <br>
    <button onclick="chooseCommunityChest()">Get A Community Chest Card</button>
</body>

</html>`;
    } else {
        code = `<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Mr. Groth's Website</title>
    <script>
        var chance = [];

        function chooseChanceCard() {
            if (typeof chance == "undefined" || chance.length < 1) {
                console.log("Shuffled");
`;
        for (i = 0; i < cardsBeingUsed.length; i++) {
            code = code + `chance.push("${cardsBeingUsed[i]}");
`;
        }
        code = code + `}

            var lng = chance.length;
            var randomNumber = Math.floor(Math.random() * lng);
            console.log("Chance Card Chosen - " + randomNumber + " - " + chance[randomNumber]);
            document.getElementById("thecard").src = chance[randomNumber];
            chance.splice(randomNumber, 1);
        }

    </script>
    <style>
        img {
            width: 299px;
            height: 172px;
        }
        button {
            width: 299px;
            height: 28px;
        }

    </style>
</head>

<body>
    <img onclick="chooseChanceCard()" id="thecard" src="https://drive.google.com/thumbnail?id=1jigNJb9RKVHzJTKBtEKUNV_St2AxdrFp">
    <br>
    <button onclick="chooseChanceCard()">Get A Chance Card</button>
</body>

</html>`;
    }
    document.getElementById("answer").value = code;
    console.log(code);
}
