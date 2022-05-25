// Fonction de récupération des données par URL
function ajaxJSCallGET(URL) {
	let donneesJSONRecuperees;
	let xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", URL, false);
	xmlHttp.send(null);

	if (xmlHttp.status === 200) {
		return JSON.parse(xmlHttp.responseText);
	}
}

function ajaxCallGET(URL, callback) {
	$.ajax({
		type: "GET",
		dataType: "json",
		url: URL,
		headers: {},
		success: function (data) {
			callback(data);
		},
		error: function (data) {
			alert(
				"An error has occurred during the process please try again after reloading the page"
			);
		},
	});
}