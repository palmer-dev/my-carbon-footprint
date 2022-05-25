import {
	selectDataBase,
	removeElementDataBase,
} from "../../../assets/script/sqlCommunication.js";

import { getAdvicesFromUser } from "./advices.js";


function main() {
	// Getting DATA
	getItineraryFromUser();
	getHabitsFromUser();
	getAdvicesFromUser(displayAdvicesFromUser);

	// Preparing page
	prepareButtonHover();

	// Initializing
	const btn = document.getElementById("deleteAccountBtn");
	const positionsBtn = [
		btn.offsetTop - btn.offsetHeight / 2,
		btn.offsetLeft - btn.offsetWidth / 2,
	];

	const listCautionP = document.querySelectorAll(".caution");

	for (let panel = 0; panel < listCautionP.length; panel++) {
		const element = listCautionP[panel];
		element.style.position = "absolute";
		element.style.top = "45%";
		element.style.left = "73%";
		element.style.transform = "translate(-50%, -100%)";
	}
}

// ****** GLOBAL VARIABLES ****** //
const timingOpacity = 500;

function getItineraryFromUser() {
	const dataForRequest = {
		typeinserted: "selectUserItinerary",
		userid: document.getElementById("idUser").value,
	};
	// alert(JSON.stringify(dataForRequest));
	selectDataBase(dataForRequest, displayItineraryFromUser);
}

// Data lookup functions
function getHabitsFromUser() {
	const dataForRequest = {
		typeinserted: "selectUserHabits",
		userid: document.getElementById("idUser").value,
	};

	selectDataBase(dataForRequest, displayHabitsFromUser);
}

// Display functions
function displayItineraryFromUser(itinerariesUser) {
	// Cleaning the container div
	cleaningCardById("itinerary");

	const itineraryNoData = document.getElementById("itineraryNoData");

	// Displaying data
	itinerariesUser.forEach((element) => {
		createCardItinerary(
			element.id,
			element.origin,
			element.destination,
			element.transportMean,
			element.distance,
			element.co2,
			itinerariesUser.indexOf(element)
		);
	});
}

function displayHabitsFromUser(habitsUser) {
	const habitsNoData = document.getElementById("habitsNoData");

	let options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	};

	cleaningCardById("habits");

	habitsUser.forEach((poolOfAnswers) => {
		createCardHabits(
			poolOfAnswers.id,
			new Date(poolOfAnswers.dateCreation).toLocaleString(
				"en-EN",
				options
			),
			poolOfAnswers.userAnswers["Heating system"],
			poolOfAnswers.userAnswers["Energie at home"],
			poolOfAnswers.userAnswers["Meat consumption"],
			poolOfAnswers.userAnswers["Seasonal product consumption"],
			poolOfAnswers.userAnswers["Your car"],
			poolOfAnswers.userAnswers["Size"],
			poolOfAnswers.userAnswers["Energy consumed"],
			poolOfAnswers.userAnswers["Most used transport means"],
			habitsUser.indexOf(poolOfAnswers),
			poolOfAnswers.userAnswers
		);
	});
}

function displayAdvicesFromUser(advices) {
	// GENERATION ADVICE CARD TO DEFINE
	console.log(advices);
	for (const advicesKey in advices) {
		createCardAdvice(advicesKey.title, advicesKey.advice,advicesKey.profit, advices.indexOf(advicesKey));
	}
}

// Delete functions
function removeItinerary(idToRemove) {
	const dataForRequest = {
		typeinserted: "deleteUserItinerary",
		userid: document.getElementById("idUser").value,
		itineraryid: idToRemove,
	};

	removeElementDataBase(dataForRequest, () => {
		removeCardById(idToRemove);
	});
}

function removeHabits(idToRemove) {
	// console.log(idToRemove);
	const dataForRequest = {
		typeinserted: "deleteUserHabits",
		userid: document.getElementById("idUser").value,
		habitsid: idToRemove,
	};
	removeElementDataBase(dataForRequest, () => {
		removeCardById(idToRemove);
	});
}

function removeUserProfile() {
	const dataForRequest = {
		typeinserted: "deleteUserProfile",
		userid: document.getElementById("idUser").value,
	};

	function redirectLogout(data) {
		location.href = "/logout.php";
	}

	removeElementDataBase(dataForRequest, redirectLogout);
}

// Global functions
function cleaningCardById(id) {
	document.querySelectorAll(`#${id}`).forEach((element) => {
		console.log();
		element.querySelectorAll("div").forEach((divElement) => {
			divElement.style.display = "none";
		});
		element.querySelectorAll("hr").forEach((hrElement) => {
			hrElement.style.display = "none";
		});
	});
}

// CREATING CARDS FUNCTION
function createCardItinerary(
	id,
	origin,
	destination,
	transport,
	distance,
	co2,
	nOCard
) {
	const containerItinerary = document.getElementById("itinerary");
	const cardItinerary = document.createElement("div");
	const originP = document.createElement("p");
	const arrow = document.createElement("img");
	const destinationP = document.createElement("p");
	const verticalSeparation = document.createElement("span");
	const transportP = document.createElement("p");
	const transportPText = document.createElement("p");
	const distanceP = document.createElement("p");
	const co2P = document.createElement("p");
	const delButton = document.createElement("button");

	// Defining element and data in them
	originP.id = "origin";
	originP.textContent = origin;
	arrow.id = "arrow";
	arrow.src = "./assets/img/svg/arrow.svg";
	destinationP.id = "destination";
	destinationP.textContent = destination;
	transportP.id = "transport";
	transportP.textContent = transport.emoji;
	transportPText.id = "transportName";
	transportPText.textContent = transport.name;
	verticalSeparation.classList.add("separation");
	distanceP.id = "distance";
	distanceP.textContent = distance + " km";
	co2P.id = "co2";
	co2P.textContent = co2 + "kg CO2";
	delButton.id = "delButton";
	delButton.value = id;
	delButton.textContent = "X";

	// Adding event listener for deleting itinerary
	delButton.addEventListener("click", (event) => {
		const idToDelete = event.target.value;
		if (confirm("Are you sure to delete the itinerary ?")) {
			removeItinerary(idToDelete);
		}
	});

	// Adding data P to the card
	cardItinerary.appendChild(originP);
	cardItinerary.appendChild(arrow);
	cardItinerary.appendChild(destinationP);
	cardItinerary.appendChild(transportP);
	cardItinerary.appendChild(transportPText);
	cardItinerary.appendChild(verticalSeparation);
	cardItinerary.appendChild(distanceP);
	cardItinerary.appendChild(co2P);
	cardItinerary.appendChild(delButton);

	// Defining properties of containerItinerary
	cardItinerary.id = id;
	cardItinerary.classList.add("cardItinerary");
	cardItinerary.style.animationDelay = (0.3 * nOCard).toString() + "s";

	// Adding the card to the container of data
	containerItinerary.appendChild(cardItinerary);
	containerItinerary.getElementsByTagName("h4")[0].style.display = "none";
}

function createCardHabits(
	idCard,
	dateAnswer,
	heatProduction,
	energyProduction,
	meatConsumption,
	seasonalProduct,
	hasACar,
	carSize,
	carEnergy,
	travelUse,
	nOCard,
	transportsMean
) {
	const containerHabits = document.getElementById("habits");
	const habitsCard = document.createElement("div");
	habitsCard.classList.add("habitsCard");
	habitsCard.style.animationDelay = (0.3 * nOCard).toString() + "s";

	const eatSeaonal =
		seasonalProduct == true
			? " and I do eat seasonal products."
			: seasonalProduct == false
				? " and I do not particularly eat seasonal products."
				: ".";
	let travelMeans = "";

	for (const [key, value] of Object.entries(transportsMean)) {
		if (key.indexOf("trip") != -1) {
			if (value != "Not answered") {
				const nKey = key.replace(" trip", "").toLowerCase();
				const nValue = parseFloat(
					nKey == "plane" ? value : value * 52
				).toLocaleString("en-IR");
				travelMeans +=
					travelMeans == ""
						? `I travel annually around ${nValue}km by ${nKey}`
						: `, around ${nValue}km by ${nKey}`;
			}
		}
	}

	travelMeans += travelMeans != "" ? "." : "";

	// Line to have it in the current locale date format here forced in english for the presentation
	// .toLocaleString(navigator.languages[0];, options)

	let newHabitsCards = "";

	newHabitsCards += `<h4 id="dateAnswers"><time datetime="${dateAnswer}">${dateAnswer}</time></h4>`;

	newHabitsCards +=
		heatProduction != "Not answered"
			? `<h4>My House</h4>` +
			(heatProduction != "Not answered"
				? `<p>My house is heated with ${heatProduction}.`
				: "") +
			(energyProduction != "Not answered"
				? ` And it uses energy produced by ${energyProduction}.</p>`
				: "")
			: (energyProduction != "Not answered"
				? `<h4>My House</h4><p>My house uses energy produced by ${energyProduction}.</p>`
				: "");

	newHabitsCards +=
		meatConsumption != "Not answered"
			? `	<h4>My eating habits</h4>
				<p>I eat ${meatConsumption} times a week meat${eatSeaonal}</p>`
			: "";

	newHabitsCards +=
		hasACar == "Yes"
			? `<h4>My car</h4><p> I have a car.` +
			(carSize == "Not answered"
				? ` It's a ${carSize} car` +
				(carEnergy != "Not answered"
					? ` that runs on ${carEnergy}.</p>`
					: "</p>")
				: "</p>")
			: "</p>";

	newHabitsCards +=
		travelUse != "Not answered" || travelMeans != ""
			? `
		<h4>My trip</h4>
		<p>I mostly travel by ${travelUse}.</p>
		<p>${travelMeans}</p>`
			: "";

	newHabitsCards += `<p class="footPrintSum"> X kg CO2/an </p> <p class="accuracyCalc">Accuracy: ${isAccurate(
		transportsMean
	)}</p>`;

	// ADDING DELETE BUTTON
	const deleteButton = document.createElement("button");
	deleteButton.value = idCard;
	deleteButton.textContent = "🗑️";
	deleteButton.addEventListener("click", () => {
		if (confirm("Are you sure to delete the answers to the Quiz?")) {
			removeHabits(idCard);
		}
	});

	habitsCard.innerHTML = newHabitsCards;

	habitsCard.appendChild(deleteButton);
	habitsCard.appendChild(document.createElement("hr"));

	habitsCard.id = idCard;

	containerHabits.appendChild(habitsCard);
	containerHabits.getElementsByTagName("h4")[0].style.display = "none";
}

function createCardAdvice(title, textAdvice, profit, noCard) {
	const containerAdvices = document.getElementById("advices");
	const adviceCard = document.createElement("div");
	adviceCard.classList.add("adviceCard");
	adviceCard.style.animationDelay = (0.3 * noCard).toString() + "s";

	let newHabitsCards = "";

	newHabitsCards += `<h3>${title}</h3>`;

	newHabitsCards += `<h3>${title}</h3>`;

	containerAdvices.appendChild(adviceCard);
}

// REMOVING CARD FUNCTION
function removeCardById(idCard) {
	const cardToRemove = document.getElementById(idCard);
	const parent = cardToRemove.parentElement;
	cardToRemove.style.animationDelay = "0s";
	cardToRemove.classList.add("removedCard");
	setTimeout(() => {
		cardToRemove.style.display = "none";
		parent.removeChild(cardToRemove);
		const isChild = parent.getElementsByTagName("div")[0];
		if (isChild == undefined) {
			// WHEN THE CARD IS EMPTY
			parent.getElementsByTagName("h4")[0].style.display = "";
		}
	}, 400);
}

// ACCURACY CALCULATOR
function isAccurate(dataSet) {
	const maxSize = Object.keys(dataSet).length;
	let currentSize = 0;
	for (const [key, value] of Object.entries(dataSet)) {
		if (value != "Not answered") {
			currentSize += 1;
		}
	}

	return ((currentSize / maxSize) * 100).toFixed(0) + "%";
}

function prepareButtonHover() {
	const btn = document.getElementById("deleteAccountBtn");
	const positionsBtn = [
		btn.offsetTop - btn.offsetHeight / 2,
		btn.offsetLeft - btn.offsetWidth / 2,
	];

	const listCautionP = document.querySelectorAll(".caution");
	const positions = [
		[30, 63],
		[60, 63],
		[30, 83],
		[60, 83],
	];

	btn.addEventListener("mouseleave", () => {
		for (let panel = 0; panel < listCautionP.length; panel++) {
			const element = listCautionP[panel];
			element.style.position = "absolute";
			element.style.top = "45%";
			element.style.left = "73%";
			element.style.transform = "translate(-50%, -100%)";
		}
	});

	btn.addEventListener("mouseover", () => {
		for (let panel = 0; panel < listCautionP.length; panel++) {
			const element = listCautionP[panel];

			element.style.position = "absolute";
			element.style.top = positions[panel][0] + "%";
			element.style.left = positions[panel][1] + "%";
			element.style.transform = "translate(-50%, -100%)";
		}
	});

	btn.addEventListener("click", () => {
		if (
			confirm(
				"Are you sure to delete your profile? All your data, quiz, itineraries will be delete from the database"
			)
		) {
			removeUserProfile();
		}
	});
}

// INITIALISATION
main();
