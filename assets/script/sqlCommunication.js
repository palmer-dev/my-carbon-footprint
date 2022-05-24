import {
	displayErrorField,
	clearErrors,
} from "../../my-environment/create-account/assets/script/verification.js";

export function sendSqlInsert(data) {
	var request = new XMLHttpRequest();
	request.open("POST", "/assets/php/databaseActivity.php", true);
	request.setRequestHeader("Content-Type", "application/json");
	request.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			if (response.error) {
				if (response.textReturned[1] == 1062) {
					if (response.textReturned[2].indexOf("us_username") != -1) {
						displayErrorField("username", "Duplicate");
					} else if (
						response.textReturned[2].indexOf("us_email") != -1
					) {
						displayErrorField("email", "Duplicate");
					} else {
						alert(
							"Error in the database ! Please try again in a few minutes"
						);
					}
				} else {
					alert(
						"Error in the database ! Please try again in a few minutes"
					);
				}
			} else {
				document.location.href = "/my-environment";
			}
		}
	};
	request.send(JSON.stringify(data));
}

export function connectUser(username, password) {
	clearErrors();
	var data = {
		typeinserted: "connectUser",
		username: username,
		password: password,
	};

	var request = new XMLHttpRequest();
	request.open("POST", "/assets/php/databaseActivity.php", true);
	request.setRequestHeader("Content-Type", "application/json");
	request.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			if (response.error) {
				// Error while doing the sql request
				alert("Error while asking the server, please try again.");
			} else if (response.textReturned.user.exist == false) {
				// User not in the database
				displayErrorField("username", "NotValid");
			} else if (!response.textReturned.goodPassword) {
				// User exist but wrong password !
				displayErrorField("password", "NotValid");
			} else {
				document.location.href = "/my-environment";
			}
		}
	};
	request.send(JSON.stringify(data));
}

export function selectDataBase(data, callBack = (response) => { }) {
	var request = new XMLHttpRequest();
	request.open("POST", "/assets/php/databaseActivity.php", true);
	request.setRequestHeader("Content-Type", "application/json");
	request.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			if (response.error) {
				// Error while doing the sql request
				console.log(response);
				alert("Error while asking the server, please try again.");
			} else {
				callBack(response.textReturned);
			}
		}
	};
	request.send(JSON.stringify(data));
}

export function removeElementDataBase(data, callBack) {
	var request = new XMLHttpRequest();
	request.open("POST", "/assets/php/databaseActivity.php", true);
	request.setRequestHeader("Content-Type", "application/json");
	request.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			if (response.error) {
				// Error while doing the sql request
				alert(
					"Error while deleting element on the server, please try again."
				);
			} else {
				callBack();
			}
		}
	};
	request.send(JSON.stringify(data));
}

export function insertionDataBase(data, callBack) {
	var request = new XMLHttpRequest();
	request.open("POST", "/assets/php/databaseActivity.php", true);
	request.setRequestHeader("Content-Type", "application/json");
	request.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			if (response.error) {
				// Error while doing the sql request
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

export function saveTempAnswerForLogin(data, callBack) {
	var request = new XMLHttpRequest();
	request.open("POST", "/assets/php/databaseActivity.php", true);
	request.setRequestHeader("Content-Type", "application/json");
	request.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			if (response.error) {
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
