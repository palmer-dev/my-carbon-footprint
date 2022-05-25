// ********* MAIN BODY ********* //
// ! VARIABLES
const nbCardLoading = 6;
const timingBetweenChangement = 50;
const delaisAnimation = 500;
let distanceBetween = 0;
let originCity = "";
let destinationCity = "";

// Fonction pour récupérer les données de l'API
//API calcul de la quantité de carbone
function calculCO2ByDistance(distance) {
	const url = `https://api.monimpacttransport.fr/beta/getEmissionsPerDistance?km=${distance}&filter=smart&fields=emoji,description`;

	const waitingTime = clearGrid();

	document.querySelector("#saveButton").disabled = true;

	setTimeout(() => {
		for (let card = 0; card < nbCardLoading; card++) {
			setTimeout(() => {
				generationCard("provisoir", "🌐", "", card);
			}, timingBetweenChangement * card);
		}

		setTimeout(() => {
			ajaxCallGET(url, callbackDistanceCO2);
		}, nbCardLoading * timingBetweenChangement);
	}, waitingTime);
}

function clearGrid() {
	const gridVehicule = document.querySelector(".vehiculelist");
	const childes = gridVehicule.querySelectorAll("label");
	let done = false;

	const waitingTime =
		childes.length > 0
			? childes.length * timingBetweenChangement + delaisAnimation
			: 0;

	for (let card = 0; card < childes.length; card++) {
		const CardEl = childes[card];
		setTimeout(() => {
			CardEl.style.animationPlayState = "paused";

			var opac = window
				.getComputedStyle(CardEl)
				.getPropertyValue("opacity");

			CardEl.style.opacity = opac;
			CardEl.classList.remove("loadingAnimate");
			CardEl.classList.add("transitionAnimate");

			CardEl.style.animationPlayState = "running";
		}, timingBetweenChangement * card);
	}

	setTimeout(() => {
		gridVehicule.innerHTML = "";
	}, waitingTime);

	return waitingTime;
}

// Fonction récupération API Google
// API calcul distance
function calculDistance(origin, destination) {
	$.ajax({
		type: "GET",
		url: `https://lab-rey.fr:5000/distanceMetrixCaller/${encodeURI(
			origin.id
		)}/${encodeURI(destination.id)}`,
		success: function (data) {
			const jsonData = JSON.parse(data)["rows"][0]["elements"][0];
			let distanceBetweenCities;
			if (jsonData["status"] == "OK") {
				distanceBetweenCities = jsonData["distance"]["value"] / 1000;
			} else {
				distanceBetweenCities = distanceBetweenTwoPointsDirect(
					origin.geometry,
					destination.geometry
				);
			}
			originCity = origin.adress;
			destinationCity = destination.adress;
			distanceBetween = distanceBetweenCities;

			calculCO2ByDistance(distanceBetweenCities);
		},
	});
}

// ************ FONCTIONS FOR DATA DISPLAY ************ //
function callbackDistanceCO2(data) {
	const waitingTime = clearGrid();

	setTimeout(() => {
		for (let i = 0; i < data.length; i++) {
			setTimeout(() => {
				generationCard(
					data[i]["name"],
					data[i]["emoji"]["main"],
					data[i]["emissions"]["kgco2e"].toFixed(2),
					i
				);
			}, timingBetweenChangement * i);
		}
		setTimeout(() => {
			$("input[name='cardTransportMean']").click(function () {
				document.querySelector("#saveButton").disabled = false;
			});
		}, data.length * timingBetweenChangement + delaisAnimation);
	}, waitingTime);
}

function generationCard(name, emoji, emissions, id) {
	let classStyle = "vehicule showAnimate";
	if (name == "provisoir") {
		name = "";
		classStyle = "vehiculeProvisoir loadingAnimate";
	} else {
	}
	$(".vehiculelist").append(
		`<input type='radio' name='cardTransportMean' id='${name}' value='${name}'/> 
			<label for='${name}' class='${classStyle}'>
				<p id='emoji'>${emoji}</p> 
				<p id='name'>${name}</p>
				<h3 id='conso${id}'><span id='valueCO2'>${emissions}</span><br> kg CO2</h3> 
			</label>`
	);
}

// ************ FONCTIONS GOOGLE ************ //
// Permet l'autocompletion des adresses
function initMap() {
	fetch("/api/apikey.json")
		.then(response => {
			return response.json();
		})
		.then(jsondata => {

			let originInformations = {},
				destinationInfrmations = {};

			const CONFIGURATION = {
				mapsApiKey: jsondata.keyAPI,
				capabilities: {
					addressAutocompleteControl: true,
					mapDisplayControl: false,
					ctaControl: false,
				},
			};
			const componentForm = ["location"];

			const getFormInputElement = (component) =>
				document.getElementById(component + "-input");
			const autocompleteFirstInput = getFormInputElement("origin");
			const autocompleteSecondInput = getFormInputElement("destination");

			const autocompleteFirst = new google.maps.places.Autocomplete(
				autocompleteFirstInput,
				{
					fields: [
						"address_components",
						"formatted_address",
						"geometry",
						"name",
						"place_id",
					],
					types: ["geocode"],
				}
			);

			const autocompleteSecond = new google.maps.places.Autocomplete(
				autocompleteSecondInput,
				{
					fields: [
						"address_components",
						"formatted_address",
						"geometry",
						"name",
						"place_id",
					],
					types: ["geocode"],
				}
			);

			autocompleteFirst.addListener("place_changed", function () {
				const place = autocompleteFirst.getPlace();
				if (!place.geometry) {
					// User entered the name of a Place that was not suggested and
					// pressed the Enter key, or the Place Details request failed.
					window.alert(
						"No details available for input: '" + place.name + "'"
					);
					return;
				}

				originInformations.geometry = new google.maps.LatLng(
					place.geometry.location.lat(),
					place.geometry.location.lng()
				);
				originInformations.id = place.place_id;
				originInformations.adress = place.formatted_address;

				fillInAddress(place, autocompleteFirstInput);
			});

			autocompleteSecond.addListener("place_changed", function () {
				const place = autocompleteSecond.getPlace();
				if (!place.geometry) {
					// User entered the name of a Place that was not suggested and
					// pressed the Enter key, or the Place Details request failed.
					window.alert(
						"No details available for input: '" + place.name + "'"
					);
					return;
				}

				destinationInfrmations.geometry = new google.maps.LatLng(
					place.geometry.location.lat(),
					place.geometry.location.lng()
				);
				destinationInfrmations.id = place.place_id;
				destinationInfrmations.adress = place.formatted_address;

				fillInAddress(place, autocompleteSecondInput);
			});

			function fillInAddress(place, inputElement) {
				// optional parameter
				const addressNameFormat = {
					street_number: "long_name",
					route: "long_name",
					locality: "long_name",
					administrative_area_level_1: "long_name",
					country: "long_name",
					postal_code: "long_name",
				};

				inputElement.value = place.formatted_address;

				if (
					autocompleteSecondInput.value != "" &&
					autocompleteFirstInput.value != ""
				) {
					calculDistance(originInformations, destinationInfrmations);
				} else {
				}
			}
		});
}

function distanceBetweenTwoPointsDirect(origin, destination) {
	return (
		google.maps.geometry.spherical.computeDistanceBetween(
			origin,
			destination
		) / 1000
	); //dividing by 1000 to get Kilometers
}

function askRecurrence() {
	var response = "";
	while (!response.match(/^\d+$/g)) {
		response = prompt(
			"How many times did you or will you do this trip ? (integer only)",
			1
		);
	}

	return parseInt(response);
}

// ************ FONCTIONS DATABASE ACCESS ************ //
function saveItinerary() {
	const dataForRequest = {
		typeinserted: "insertItineraryUser",
		userId: document.getElementById("idUser").value,
		originPoint: originCity,
		destinationPoint: destinationCity,
		transportMean: {
			name: document.querySelector(
				"input[name='cardTransportMean']:checked"
			).value,
			emoji: document.querySelector(
				'input[name="cardTransportMean"]:checked + label #emoji'
			).textContent,
		},
		distance: distanceBetween,
		co2: document.querySelector(
			'input[name="cardTransportMean"]:checked + label h3 #valueCO2'
		).textContent,
		nbRecurrence: askRecurrence(),
	};

	// callBack function
	function backData(result) {
		const isConnected = result.textReturned.isConnected;

		if (!isConnected) {
			location.href = "/my-environment/login/index.php?toSave=true";
		} else {
			document.querySelector("#saveButton").value = "Trip saved! ✅";
			document.querySelector("#saveButton").disabled = true;
		}
	}

	insertionDataBase(dataForRequest, backData);
}
