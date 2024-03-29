import {
	selectDataBase,
	removeElementDataBase,
} from "../../../assets/script/sqlCommunication.js";

import { getAdvicesFromUser } from "./advices.js";

// GLOBAL VARIABLE
let actualTotal = 0;

function main() {
	// Getting DATA
	getItineraryFromUser();
	getHabitsFromUser();
	getAdvicesFromUser(displayAdvicesFromUser);

	// Preparing page
	prepareButtonHover();

	const listCautionP = document.querySelectorAll(".caution");

	for (let panel = 0; panel < listCautionP.length; panel++) {
		const element = listCautionP[panel];
		element.style.position = "absolute";
		element.style.top = "45%";
		element.style.left = "73%";
		element.style.transform = "translate(-50%, -100%)";
	}
}

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
	if (itinerariesUser.length == 0){return}
	cleaningCardById("itinerary");

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
	if (habitsUser.length == 0){return}
	let options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	};

	cleaningCardById("habits");
	const data = loadDataJSON("/my-habits/assets/json/data.json");

	habitsUser.forEach((poolOfAnswers) => {
		const kmVoiture = parseInt(poolOfAnswers.userAnswers["Car trip"].replace("Not answered","")) || 0;
		const typeVoiture = poolOfAnswers.userAnswers["Energy consumed"] === "Not answered" ? "Electricity": poolOfAnswers.userAnswers["Energy consumed"];
		const kmBus = parseInt(poolOfAnswers.userAnswers["Bus trip"].replace("Not answered","")) || 0;
		const kmPlane = parseInt(poolOfAnswers.userAnswers["Plane trip"].replace("Not answered","")) || 0;
		const kmTrain = parseInt(poolOfAnswers.userAnswers["Train trip"].replace("Not answered","")) || 0;
		const kmMetro = parseInt(poolOfAnswers.userAnswers["Metro trip"].replace("Not answered","")) || 0;
		const typeHeating = poolOfAnswers.userAnswers["Heating system"] === "Not answered" ? "Electricity": poolOfAnswers.userAnswers["Heating system"];
		const sizeHome = parseInt(poolOfAnswers.userAnswers["Home size"].replace("Not answered","")) || 0;
		const typeElectricity = poolOfAnswers.userAnswers["Energie at home"] === "Not answered" ? "Nuclear": poolOfAnswers.userAnswers["Energie at home"];
		const freqmeat = parseInt(poolOfAnswers.userAnswers["Meat consumption"].replace("Not answered","")) || 0;
		const local = poolOfAnswers.userAnswers["local product consumption"] === "Not answered" ? "No" : poolOfAnswers.userAnswers["local product consumption"];

		createCardHabits(
			poolOfAnswers.id,
			new Date(poolOfAnswers.dateCreation).toLocaleString(
				"en-EN",
				options
			),
			poolOfAnswers.userAnswers["Heating system"],
			poolOfAnswers.userAnswers["Energie at home"],
			poolOfAnswers.userAnswers["Meat consumption"],
			poolOfAnswers.userAnswers["local product consumption"],
			poolOfAnswers.userAnswers["Your car"],
			poolOfAnswers.userAnswers["Size"],
			poolOfAnswers.userAnswers["Energy consumed"],
			poolOfAnswers.userAnswers["Most used transport means"],
			habitsUser.indexOf(poolOfAnswers),
			poolOfAnswers.userAnswers,
			totalConsommation(kmVoiture,typeVoiture,kmBus,kmPlane,kmTrain,kmMetro,typeHeating,sizeHome,typeElectricity,freqmeat,local,JSON.parse(data)).toFixed(2)
		);
	});
}

function displayAdvicesFromUser(advices) {
	// GENERATION ADVICE CARD TO DEFINE
	if (advices[0] == undefined){return}

	cleaningCardById("advices");

	const co2Total = document.getElementById("totalCO2");
	if(co2Total !== null){
		co2Total.remove();
	}

	actualTotal = advices[0].currentCO2;

	for (const advicesKey in advices) {
		const advice = advices[advicesKey];
		createCardAdvice(advice.id, advice.title, advice.advice,advice.profit, advicesKey);
	}
	addTotalCurrentToAdvice();
}

function addTotalCurrentToAdvice(){
	const containerAdvices = document.getElementById("advices");
	const total = document.createElement("p");
	total.id = "totalCO2";
	total.classList.add("totalCO2");
	total.textContent = `${actualTotal}kg CO2/year`;
	if (document.getElementById("totalCO2") != undefined){
		document.getElementById("totalCO2").textContent = `${actualTotal}kg CO2/year`;
	}else{
		containerAdvices.appendChild(total);
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
	const dataForRequest = {
		typeinserted: "deleteUserHabits",
		userid: document.getElementById("idUser").value,
		habitsid: idToRemove,
	};

	removeElementDataBase(dataForRequest, () => {
		removeCardById(idToRemove);
		setTimeout(()=>{
			const co2Total = document.getElementById("totalCO2");
			if(co2Total !== null){
				co2Total.remove();
			}
			getAdvicesFromUser(displayAdvicesFromUser);
			},500
		);
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
		element.querySelectorAll("div").forEach((divElement) => {
			removeCardById(divElement.id);
		});
	});
}

// CREATING CARDS FUNCTION
function createCardItinerary(id,origin,destination,transport,distance,co2,nOCard) {
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

function createCardHabits(idCard,dateAnswer,heatProduction,energyProduction,meatConsumption,seasonalProduct,hasACar,carSize,carEnergy,travelUse,nOCard,transportsMean,co2Value) {
	const containerHabits = document.getElementById("habits");
	const habitsCard = document.createElement("div");
	habitsCard.classList.add("habitsCard");
	habitsCard.style.animationDelay = (0.3 * nOCard).toString() + "s";

	const eatSeasonal =
		seasonalProduct === "Yes"
			? " and I do eat seasonal products."
			: seasonalProduct === "No"
				? " and I do not particularly eat seasonal products."
				: "";
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
				<p>I eat ${meatConsumption} times a week meat${eatSeasonal}</p>`
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

	newHabitsCards += `<p class="footPrintSum"> ${co2Value} kg CO2/year </p> <p class="accuracyCalc">Accuracy: ${isAccurate(
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

function createCardAdvice(id, title, textAdvice, profit, noCard) {
	const containerAdvices = document.getElementById("advices");
	const advicesNoData = document.getElementById("advicesNoData");
	const adviceCard = document.createElement("div");
	adviceCard.classList.add("adviceCard");
	adviceCard.style.animationDelay = (0.3 * noCard).toString() + "s";
	adviceCard.id = id;

	let newHabitsCards = "";

	newHabitsCards += `<h3>${title}</h3>`;
	newHabitsCards += `<p>${textAdvice}</p>`;
	newHabitsCards += `<p class="profitValue" id="co2AdviceTotal" style="opacity: 1">${profit}kg CO2/year</p>`;

	adviceCard.innerHTML = newHabitsCards;

	containerAdvices.appendChild(adviceCard);
	advicesNoData.style.display = "none";
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
			const {style} = listCautionP[panel];
			style.position = "absolute";
			style.top = "45%";
			style.left = "73%";
			style.transform = "translate(-50%, -100%)";
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
		if (confirm("Are you sure to delete your profile? All your data, quiz, itineraries will be delete from the database")) {
			removeUserProfile();
		}
	});
}

function loadDataJSON(filePath, mimeType) {
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET",filePath,false);
	xmlhttp.overrideMimeType("application/json");
	xmlhttp.send();
	if (xmlhttp.status==200 && xmlhttp.readyState == 4 )
	{
		return xmlhttp.responseText;
	}
	else {
		return null;
	}
}

// INITIALISATION
main();
