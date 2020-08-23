window.onload = refreshData;

let x = 0;
function refreshData() {
	x++;
	let temp = x.toString(2);
	document.getElementById("answer").innerHTML = temp;
	setTimeout(refreshData, 1000);
}