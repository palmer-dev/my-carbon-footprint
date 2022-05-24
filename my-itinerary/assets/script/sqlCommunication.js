function insertionDataBase(data, callBack) {
	var request = new XMLHttpRequest();
	request.open("POST", "/assets/php/databaseActivity.php", true);
	request.setRequestHeader("Content-Type", "application/json");
	request.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			if (response.error) {
				// Error while doing the sql request
				console.log(response.textReturned);
				alert(
					"Error while sending data to the server, please try again."
				);
			} else {
				callBack(response);
			}
		}
	};
	request.send(JSON.stringify(data));
}
