function encrypt(encoding) {
	let message = document.getElementById("data").value;
	document.getElementById("data").value = ((encoding) ? encode(message) : decode(message));
	if(encoding) { copyToClipboard(); }
}

function encode(msg) {
	try {
	let encodedMessage = "";
	let encodingKey = Math.floor(Math.random() * 10) + 10;
	for (let i = 0; i < msg.length; i++) {
		let nextCharacterCode = msg.charCodeAt(i) + encodingKey - (i % encodingKey) + 1;
		encodedMessage += String.fromCharCode(nextCharacterCode);
	}
	return btoa(String.fromCharCode(encodingKey + 87) + encodedMessage);
}
catch(e) {
	return `Error In Encoding - ${e.toString().slice(61)}`
}
copyToClipboard();
}


function decode(msg) {
	try {
		let decodedMessage = "";
		msg = atob(msg);
		let decodingKey = msg.charCodeAt(0) - 87;
		console.log(decodingKey);
		msg = msg.substr(1);
		console.log(msg);
		for (let i = 0; i < msg.length; i++) {
			let nextCharacterCode = msg.charCodeAt(i) - decodingKey + (i % decodingKey) - 1;
			decodedMessage += String.fromCharCode(nextCharacterCode);
		}
		return ((isNaN(decodingKey)) ? "error decoding message, please use a valid message" : decodedMessage);
	} catch (e) {
		console.log(e);
		return `Error In Decoding - ${e.toString().slice(61)}`;
	}
}


function copyToClipboard() {
	var copyText = document.getElementById("data");
	copyText.select();
	document.execCommand("copy");
}