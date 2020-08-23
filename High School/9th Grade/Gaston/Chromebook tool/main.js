window.onload=function(){

  function readSingleFile(evt) {
    var f = evt.target.files[0]; 

    if (f) {
      var r = new FileReader();
      r.onload = function(e) { 
	      var contents = e.target.result;
document.getElementById("fileName").value = f.name;
document.getElementById("text-val").value = contents;
      }
      r.readAsText(f);
    } else { 
      alert("Failed to load file");
    }
  }

  document.getElementById('fileinput').addEventListener('change', readSingleFile, false);
// Other content

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

// Start file download.
document.getElementById("dwn-btn").addEventListener("click", function(){
    // Generate download of hello.txt file with some content
    var text = document.getElementById("text-val").value;
    var filename = document.getElementById("fileName").value;
    
    download(filename, text);
}, false);

}