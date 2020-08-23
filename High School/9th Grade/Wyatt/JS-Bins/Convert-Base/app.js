function convertBase(arr, base1, base2) {
  /*if(base1 > 10 || base2 > 10 || base1 < 2 || base2 < 2 || base1 == parseInt(base1) || base2 !== parseInt(base1)|| base1 == null || base2 == null){
    document.getElementById("step1").innerHTML = "Null";
    document.getElementById("step2").innerHTML = "Null";
    document.getElementById("output").innerHTML = "Really?";
    return;
  }*/
  arr = arr.split("");   
  var stepUno = [];
  var stepDos= [];
  var base10 = 0;
    var final = [];
    arr = arr.reverse();
    for (var i = 0; i < arr.length; i++) {
        base10 += arr[i] * Math.pow(base1, i);
      stepUno.push(" Take " + arr[i] + " times " + base1 + " to the power of " + i);
    }
  document.getElementById("step1").innerHTML = stepUno;
    while (base10 !== 0) {
        final.push(base10 % base2);
        base10 = (base10 - (base10 % base2)) / base2
        stepDos.push("Than Divide " + base10 + " by " + base2 + " and take the remainder of " + base10 % base2 + " and keep the rest which is " + (base10 - (base10 % base2)) / base2);
    }
  document.getElementById("step2").innerHTML = stepDos;
  final = final.join("");  
  document.getElementById("output").innerHTML = final;
}

