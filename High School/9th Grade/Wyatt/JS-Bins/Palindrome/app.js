function palindrome(){
  var input;
  var stage;
  var pal;
  var output = 0;
  var multiple1;
  var multiple2;
  for(var i = 1; i < Math.floor(Math.random()*1000); i++){
    for(var e = 1; e < Math.floor(Math.random()*1000); e++){
      input = e * i;
      stage = input.toString();
      pal = stage.split("").reverse().join("");
      if(pal == stage && input > output){
        output = input;
        multiple1 = i;
        multiple2 = e;
      }
    }
  }
  return output + " , " + multiple1 + " times " + multiple2;
}
console.log(palindrome());


