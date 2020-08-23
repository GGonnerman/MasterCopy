function setVariable() {
    var a = document.getElementById("Length").value;
    if(a === "" || a < 0){
    a = 0;
  }
     var b = document.getElementById("Depth").value;
    if(b === "" || b < 0){
    b = 0;
  }
     var height = document.getElementById("Height").value;
    if(height === "" || height < 0){
      height = 0;
    }
    var middleToSide = 1 / 2 * a;
    var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    var densityGramPerCmCubed = 19.32;
    var areaBase = (a * b) / 2;
    var volume = (areaBase * height) * 1 / 3;
    var weight = Math.round(volume / densityGramPerCmCubed);
    var slantHeight = Math.sqrt(Math.pow(height, 2) + Math.pow(middleToSide, 2));
    var perimiterBase = a + b + c;
    var surfaceArea = (perimiterBase * slantHeight) / 2 + areaBase;
    var priceGold = "$" + Math.round(weight * 40.08);
    document.getElementById("output").innerHTML = "In Centimeters" + "<br>" + "Length: " + a + "<br>" + "Depth: " + b + "<br>" + "Slant A: " + c + "<br>" + "Height: " + height + "<br>" + "Slant B: " + slantHeight + "<br>" + "Area of Base: " + areaBase + "<br>" + "Surface Area: " + surfaceArea + "<br>" + "Volume: " + volume + "<br>" + "Weight in Gold (Grams): " + weight + "<br>" + "Price in Gold: " + priceGold;

}

function random() {
    var i = 0;
    while (i < 1) {
        var a = Math.floor(Math.random() * 100);
        var b = Math.floor(Math.random() * 100);
        var height = Math.floor(Math.random() * 100);
        var middleToSide = 1 / 2 * a;
        if (a !== 0 && b !== 0 && height !== 0 && Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)) % 1 === 0 && Math.sqrt(Math.pow(height, 2) + Math.pow(middleToSide, 2)) % 1 === 0) {
            var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
            var densityGramPerCmCubed = 19.32;
            var areaBase = (a * b) / 2;
            var volume = (areaBase * height) * 1 / 3;
            var weight = Math.round(volume / densityGramPerCmCubed);
            var slantHeight = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)) % 1 === 0 && Math.sqrt(Math.pow(height, 2) + Math.pow(middleToSide, 2));
            var perimiterBase = a + b + c;
            var surfaceArea = (perimiterBase * slantHeight) / 2 + areaBase;
            var priceGold = "$" + Math.round(weight * 40.08);
            document.getElementById("output").innerHTML = "In Centimeters" + "<br>" + "Length: " + a + "<br>" + "Depth: " + b + "<br>" + "Side C: " + c + "<br>" + "Height: " + height + "<br>" + "Slant Height: " + slantHeight + "<br>" + "Area of Base: " + areaBase + "<br>" + "Surface Area: " + surfaceArea + "<br>" + "Volume: " + volume + "<br>" + "Weight in Gold (Grams): " + weight + "<br>" + "Price in Gold: " + priceGold;
            i = 1;
        }
    }
}
