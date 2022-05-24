// ********** MODULES IMPORT ********** //
import { sendSqlInsert } from "../../../../assets/script/sqlCommunication.js";

import { validation, validateField } from "./verification.js";

// ********** FUNCTION DECLARATION ********** //
function randomPositionClouds() {
	var positionsX = [10, 35, 60, 85];
	for (let cloud = 1; cloud <= 4; cloud++) {
		const cloudSvg = document.getElementById("cloud" + cloud);
		var index = Math.floor(Math.random() * positionsX.length);
		cloudSvg.style.left = positionsX[index] + "%";
		positionsX.splice(index, 1);
	}
}

document.getElementById("createNew").addEventListener("click", createNewUser);

function createNewUser() {
	var data = {
		typeinserted: "newUser",
		lastname: document.getElementById("lastname").value,
		firstname: document.getElementById("firstname").value,
		email: document.getElementById("email").value,
		username: document.getElementById("username").value,
		password: document.getElementById("password").value,
	};

	if (validation()) {
		sendSqlInsert(data);
	}
}

["firstname", "lastname", "email", "username", "password"].forEach((field) => {
	document.getElementById(field).addEventListener("input", () => {
		validateField(field);
	});
});

// ********** INITIALISATION ********** //
randomPositionClouds();
