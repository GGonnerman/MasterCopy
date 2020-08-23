var code;
var cardsBeingUsed = [];
var lastInputBox = 6;
var itemsAdded = [];
var amt = 0;

function copyToClipboard() {
    var copyText = document.getElementById("answer");
    copyText.select();
    document.execCommand("copy");
}


function addLine() {
    if (document.getElementById(lastInputBox).value !== '') {
        for (i = lastInputBox + 1; i < lastInputBox + 7; i++) {
            itemsAdded[i] = document.createElement('img');
            itemsAdded[i].setAttribute("id", 100 + i);
            itemsAdded[i].setAttribute("src", "https://goo.gl/EZ7bPY");
            itemsAdded[i].setAttribute('style', 'padding: 2px;')
            console.log("created a new image");
            document.getElementById("test").appendChild(itemsAdded[i]);
            amt++;
        }
        itemsAdded[amt] = document.createElement('br');
        document.getElementById("test").appendChild(itemsAdded[amt]);
        amt++;
        for (i = lastInputBox + 1; i < lastInputBox + 7; i++) {
            itemsAdded[i] = document.createElement('input');
            itemsAdded[i].setAttribute("type", "text");
            itemsAdded[i].setAttribute("id", i);
            itemsAdded[i].setAttribute("onchange", "changed(" + i + ")");
            itemsAdded[i].setAttribute('style', 'margin: 2px;')
            console.log("created a new input");
            document.getElementById("test").appendChild(itemsAdded[i]);
            amt++;
        }
        itemsAdded[amt] = document.createElement('p');
        document.getElementById("test").appendChild(itemsAdded[amt]);
        amt++;
        lastInputBox += 6;
    }
}

function formatLink(link) {
    return document.getElementById(link).value.replace('file/d/', 'thumbnail?id=').replace('/view', '');
}

function changed(x) {
    addLine();
    var changeImage = formatLink(x);
    document.getElementById(x + 100).src = changeImage;
}

function combine() {
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

    </style>
</head>

<body>
    <br>
    <button onclick="chooseCommunityChest()">Get A Community Chest Card</button>
    <p></p>
    <img onclick="chooseCommunityChest()" id="thecard" src="https://drive.google.com/thumbnail?id=1o2cDBlmK7oqqEohoLDSIYcW949lfFRgI">
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

    </style>
</head>

<body>
    <br>
    <button onclick="chooseChanceCard()">Get A Chance Card</button>
    <p></p>
    <img onclick="chooseChanceCard()" id="thecard" src="https://drive.google.com/thumbnail?id=1jigNJb9RKVHzJTKBtEKUNV_St2AxdrFp">
</body>

</html>`;
    }
    document.getElementById("answer").value = code;
    console.log(code);
}
