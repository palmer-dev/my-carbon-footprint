import { connectUser } from "../../../../assets/script/sqlCommunication.js";
// import { displayErrorField } from "../../../create-account/assets/script/verification.js";

document.getElementById("login").addEventListener("click", connectUserInfo);
document.getElementById("password").addEventListener("keydown", (event) => {
	if (event.code == "Enter") {
		connectUserInfo();
	}
});

function connectUserInfo() {
	connectUser(
		document.getElementById("username").value,
		document.getElementById("password").value
	);
}
