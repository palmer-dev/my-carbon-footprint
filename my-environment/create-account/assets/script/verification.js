export function validation() {
	var filedToValidate = [
		{ id: "firstname", mandatory: false, regex: /()/ },
		{ id: "lastname", mandatory: false, regex: /()/ },
		{
			id: "email",
			mandatory: true,
			regex: /(^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$)/,
		},
		{ id: "username", mandatory: true, regex: /(^.{5,}$)/ },
		{ id: "password", mandatory: true, regex: /(^.{5,}$)/ },
	];

	var validated = true;

	filedToValidate.forEach((field) => {
		var value = document.getElementById(field.id).value;
		if (value.match(field.regex) == null) {
			displayErrorField(field.id, "Mandatory");
			validated = false;
		} else {
			displayErrorField(field.id, "none");
		}
	});

	return validated;
}

export function validateField(id) {
	var filedToValidate = {
		firstname: {
			value: document.getElementById(id).value,
			mandatory: false,
			regex: /()/,
		},
		lastname: {
			value: document.getElementById(id).value,
			mandatory: false,
			regex: /()/,
		},
		email: {
			value: document.getElementById(id).value,
			mandatory: true,
			regex: /(^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$)/,
		},
		username: {
			value: document.getElementById(id).value,
			mandatory: true,
			regex: /(^.{5,}$)/,
		},
		password: {
			value: document.getElementById(id).value,
			mandatory: true,
			regex: /(^.{5,}$)/,
		},
	};

	if (filedToValidate[id].value.match(filedToValidate[id].regex) == null) {
		displayErrorField(id, "Mandatory");
	} else {
		displayErrorField(id, "none");
	}
}

export function clearErrors() {
	// Finding all elements that are for showing error
	const errorList = document.querySelectorAll('[id*="-err"]');

	// Getting all ids linked with the error elements (each unique)
	const idGlobalList = [
		...new Set(
			[...errorList].map((error) =>
				error.id.substring(0, error.id.indexOf("-"))
			)
		),
	];

	// Getting the HTML Elements with the ids
	const fieldList = idGlobalList.map((field) =>
		document.getElementById(field)
	);

	// Remove from displayed elements the error line
	errorList.forEach((element) => {
		element.style.display = "none";
	});

	// Remove the css class that makes a field red
	fieldList.forEach((element) => {
		element.classList.remove("invalide");
	});
}

export function displayErrorField(idGlobal, typeInvalidation = "Duplicate") {
	var typeError = ["Duplicate", "Mandatory", "NotValid"];
	typeError.forEach((error) => {
		try {
			if (error == typeInvalidation) {
				document.getElementById(
					idGlobal + "-err" + error
				).style.display = "inline";
				document.getElementById(idGlobal).classList.add("invalide");
			} else {
				document.getElementById(
					idGlobal + "-err" + error
				).style.display = "none";
				document.getElementById(idGlobal).classList.remove("invalide");
			}
		} catch (problem) {}
	});
}
