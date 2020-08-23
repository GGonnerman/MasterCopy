var encrytionData = {
    "a": "%(",
    "b": "&)",
    "c": "$@",
    "d": "{;",
    "e": "))",
    "f": ";]",
    "g": "&%",
    "h": "+-",
    "i": "=_",
    "j": ":;",
    "k": "-(",
    "l": "{*",
    "m": "|-",
    "n": "&$",
    "o": "--",
    "p": "__",
    "q": "*{",
    "r": "^&",
    "s": "||",
    "t": "==",
    "u": "}{",
    "v": ",:",
    "w": "&&",
    "x": "%!",
    "y": "+}",
    "z": "**",
    "1": ")&",
    "2": "&*",
    "3": ":(",
    "4": ":}",
    "5": "><",
    "6": "!!",
    "7": "^$",
    "8": "=)",
    "9": "$$",
    "0": ">}",
    "[": "[{",
    "]": ".>",
    "{": "??",
    "}": ".?",
    "#": ",<",
    "%": "}<",
    "^": "+=",
    "*": "=+",
    "+": ";-",
    "=": "_#",
    "_": "!@",
    "|": "@.",
    "~": "),",
    "<": "^.",
    ">": "]$",
    "(": "(*",
    ")": "=&",
    ":": ".&",
    ";": "#)",
    "'": "](",
    '"': "!<",
    "/": "%[",
    "-": "%>",
    "!": "<?",
    " ": "^^"
}

var unencrytionData = {
    "<?": "!",
    "^^": " ",
    "%[": "/",
    "%>": "-",
    "!<": '"',
    "](": "'",
    ".&": ":",
    "#)": ";",
    "(*": "(",
    "=&": ")",
    "^.": "<",
    "]$": ">",
    "),": "~",
    "!@": "_",
    "@.": "|",
    ";-": "+",
    "_#": "=",
    "+=": "^",
    "=+": "*",
    ",<": "#",
    "}<": "%",
    "??": "{",
    ".?": "}",
    "[{": "[",
    ".>": "]",
    ")&": "1",
    "&*": "2",
    ":(": "3",
    ":}": "4",
    "><": "5",
    "!!": "6",
    "^$": "7",
    "=)": "8",
    "$$": "9",
    ">}": "0",
    "%(": "a",
    "&)": "b",
    "$@": "c",
    "{;": "d",
    "))": "e",
    ";]": "f",
    "&%": "g",
    "+-": "h",
    "=_": "i",
    ":;": "j",
    "-(": "k",
    "{*": "l",
    "|-": "m",
    "&$": "n",
    "--": "o",
    "__": "p",
    "*{": "q",
    "^&": "r",
    "||": "s",
    "==": "t",
    "}{": "u",
    ",:": "v",
    "&&": "w",
    "%!": "x",
    "+}": "y",
    "**": "z"
}

function doit() {
    var uncodeOrEncode = document.getElementById("selection").value;
    var codes = document.getElementById("input").value;
    codes = codes.toLowerCase();
    console.log(codes);
    if (uncodeOrEncode === "Encode") {
        encrypt(codes);
    } else if (uncodeOrEncode === "Uncode") {
        uncrypt(codes);
    } else {
        console.log("Errors");
    }
}

function encrypt(code) {
    var max = code.length;
    var newCode = "";
    for (var i = 0; i < code.length; i++) {
            newCode += encrytionData[code[i]];
    }
    console.log(code);
    console.log(newCode);
    document.getElementById("solution").value = newCode;
}

function uncrypt(code) {
    var max = code.length;
    var newCode = "";
    for (var i = 0; i < code.length; i += 2) {
        newCode += unencrytionData[code[i] + code[i + 1]];
    }
    console.log(code);
    console.log(newCode);
    document.getElementById("solution").value = newCode;
}

function copyToClipboard() {
    var copyText = document.getElementById("solution");
    copyText.select();
    document.execCommand("copy");
}

document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
       window.location.href = "../main.html";
    }
};
