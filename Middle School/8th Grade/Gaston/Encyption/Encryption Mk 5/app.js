function TheLogin() {
	var password = 'Cobblestone';
	if (document.getElementById("pword").value == password) {
		top.location.href = "Other/index.html";
	} else {
		window.alert("Incorrect password, please try again.");
	}
}

function keyPressed() {
	if (keyCode === 13) {
		TheLogin();
	}
}