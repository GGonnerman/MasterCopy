// eval()
var word;
var max;
var skip;
var answer;
var num;
var oPlaceName;
var equationa;
var equationb;

function myFunction() {
    console.log("myFunction is called!");
    word = document.getElementById("text").value;
    max = parseInt(document.getElementById("height").value);
    skip = parseInt(document.getElementById("interval").value);
    answer = document.getElementById("end");
    answer.rows = max * 2 + 1;
    var start = [];
    var second = [];
    var last = [];
    if (document.getElementById("selector").value === "eq") {

        equationa = document.getElementById("equation").value;
        for (i = 1; i < max; i++) {
            equationb = equationa.replace("y = ", "").replace("y=", "").replace("0x", "0 * " + i).replace("1x", "1 * " + i).replace("2x", "2 * " + i).replace("3x", "3 * " + i).replace("4x", "4 * " + i).replace("5x", "5 * " + i).replace("6x", "6 * " + i).replace("7x", "7 * " + i).replace("8x", "8 * " + i).replace("9x", "9 * " + i).replace("x", "" + i);
            var k = i - 1;
            equationc = equationa.replace("y = ", "").replace("y=", "").replace("0x", "0 * " + k).replace("1x", "1 * " + k).replace("2x", "2 * " + k).replace("3x", "3 * " + k).replace("4x", "4 * " + k).replace("5x", "5 * " + k).replace("6x", "6 * " + k).replace("7x", "7 * " + k).replace("8x", "8 * " + k).replace("9x", "9 * " + k).replace("x", "" + k);
            console.log(equationb);
            console.log(eval(equationb));
            var val = eval(equationc);
            console.log(val);
            for (j = 0; j < val; j++) {
                word = ' ' + word;
            }
            start.push(word);
            second.push(word);

        }
        second = second.reverse();
        second.shift();

        final = start.concat(second);
        console.log(final.join('\n'));
        answer.innerHTML = final.join('\n');
        answer.rows = max * 2 + 1;
    } else if (document.getElementById("selector").value === "hi") {

        if (max % skip === 0) {
            if (max <= 1) {
                max = 1;
            };
            if (skip <= 1) {
                skip = 1;
            };

            start.push(word);
            second.push(word);
            for (i = 0; i < max; i += skip) {
                console.log(i);
                for (j = 0; j < skip; j++) {
                    console.log(j);
                    word = ' ' + word;
                }
                start.push(word);
                second.push(word);

            }

            second = second.reverse();
            second.shift();

            final = start.concat(second);
            console.log(final.join('\n'));
            answer.innerHTML = final.join('\n');
            answer.rows = max * 2 + 1;

        }
        start = [];
        second = [];
        last = [];
        word = document.getElementById("text").value;
        max = parseInt(document.getElementById("height").value);
        skip = parseInt(document.getElementById("interval").value);
        answer = document.getElementById("end");
    } else {
        console.log('No selection made.');
    }
}

// --- Not My Code ---

function copyStuff() {
    var copyText = document.getElementById("end");
    copyText.select();
    document.execCommand("Copy");
}
