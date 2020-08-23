function ABaX() {
  for(var e = 0; e < 10; e++){ 
  var i = 0;
    while (i !== 1) {
        var A = Math.floor(Math.random() * 10000);
        var B = Math.floor(Math.random() * 10000);
        var areaX = Math.floor(Math.random() * 10000);
        var area = A * B;
        var x1 = (-(2 * B + 2 * A) + Math.sqrt(Math.pow(2 * B + 2 * A, 2) - 4 * 4 * ((A * B - areaX) - A * B))) / 8;
        var x2 = (-(2 * B + 2 * A) - Math.sqrt(Math.pow(2 * B + 2 * A, 2) - 4 * 4 * ((A * B - areaX) - A * B))) / 8;
        if (A !== 0 && B !== 0 && areaX !== 0) {
            if (x1 > 0 && x2 > 0) {
                if (x1 == Math.floor(x1) || x2 == Math.floor(x2)) {
                    i = 1;
                    console.log("With an outside area of " + areaX + " and with side lengths of " + A + " and " + B);
                    console.log("X = {" + x1 + ", " + x2 + "}");
                }

            } else if (x1 > 0) {
                if (x1 == Math.floor(x1)) {
                    i = 1;
                    console.log("With an outside area of " + areaX + " and with side lengths of " + A + " and " + B);
                    console.log("X = " + x1);
                }
            } else if (x2 > 0) {
                if (x2 == Math.floor(x2)) {
                    i = 1;
                    console.log("With an outside area of " + areaX + " and with side lengths of " + A + " and " + B);
                    console.log("X = " + x2);
                }
            } else {
                console.log("With an outside area of " + areaX + " and with side lengths of " + A + " and " + B);
                console.log("Invalid Operation");
            }
        }
    }
}
}
ABaX();
