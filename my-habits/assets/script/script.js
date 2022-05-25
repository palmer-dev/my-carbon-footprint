import {
	insertionDataBase,
	selectDataBase,
	saveTempAnswerForLogin,
} from "../../../assets/script/sqlCommunication.js";

let questions = [];

function generateUUID() {
	// Public Domain/MIT
	var d = new Date().getTime(); //Timestamp
	var d2 =
		(typeof performance !== "undefined" &&
			performance.now &&
			performance.now() * 1000) ||
		0; //Time in microseconds since page-load or 0 if unsupported
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
		/[xy]/g,
		function (c) {
			var r = Math.random() * 16; //random number between 0 and 16
			if (d > 0) {
				//Use timestamp until depleted
				r = (d + r) % 16 | 0;
				d = Math.floor(d / 16);
			} else {
				//Use microseconds since page-load if supported
				r = (d2 + r) % 16 | 0;
				d2 = Math.floor(d2 / 16);
			}
			return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
		}
	);
}

function getQuestionsFromDataBase() {
	function registerInVariableQuestions(dataBaseQuestions) {
		questions = dataBaseQuestions;
	}

	const dataForRequest = {
		typeinserted: "selectQuestions",
	};

	selectDataBase(dataForRequest, registerInVariableQuestions);
}

getQuestionsFromDataBase();

var currentQuestion = 1;

function startQuiz() {
	document.querySelector(".descriptionQuiz").style.opacity = 1;
	document.getElementById("buttsuiv").textContent = "Continue";
	document
		.querySelector(".habitsQuiz")
		.removeEventListener("click", startQuiz);
	displayQuestion();
	document.querySelector(".habitsQuiz").addEventListener("click", saveAnswer);
}

function saveAnswer() {
	let answer = null;
	const typeAnswer = document.getElementsByName("answer")[0]["type"];

	if (typeAnswer == "number") {
		answer = document.querySelector("input[name='answer']").value;
		answer = answer == "" ? null : parseInt(answer);
		questions[currentQuestion - 1].userAnswer = answer;
	} else {
		try {
			answer = document.querySelector(
				"input[name='answer']:checked"
			).value;
		} catch (error) { }
		questions[currentQuestion - 1].userAnswer = answer;
	}

	if (currentQuestion == questions.length) {
		document
			.querySelector(".habitsQuiz")
			.removeEventListener("click", saveAnswer);
		changeDisplayForResults();

	} else {
		currentQuestion += 1;
		if (currentQuestion == questions.length) {
			document.getElementById("buttsuiv").textContent = "Finish";
		}
		displayQuestion();
	}
}

function displayQuestion() {
	const question = questions[currentQuestion - 1];
	const quizContainer = document.querySelector(".descriptionQuiz");
	quizContainer.innerHTML = "";

	// CREATION OF THE ELEMENTS OF THE QUESTION

	var questionTexte = document.createElement("p");
	var answers = [];

	if (question.possibleAnswers.type != undefined) {
		var questionAnswer = document.createElement("input");
		var plusbtn = document.createElement("btn");
		var minusbtn = document.createElement("btn");

		questionAnswer.type = question.possibleAnswers.type;
		questionAnswer.step = question.possibleAnswers.step;
		questionAnswer.min = 0;
		questionAnswer.name = "answer";

		minusbtn.id = "minus";
		plusbtn.id = "plus";
		minusbtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 10h24v4h-24z"/></svg>`;
		plusbtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>`;

		// CLICK HANDLERS
		plusbtn.addEventListener("click", (e) => {
			questionAnswer.stepUp();
		});
		minusbtn.addEventListener("click", (e) => {
			questionAnswer.stepDown();
		});

		answers.push(questionAnswer);
		answers.push(plusbtn);
		answers.push(minusbtn);
	} else {
		question.possibleAnswers.forEach((answer) => {
			var containerAnswer = document.createElement("div");
			var questionAnswer = document.createElement("input");
			var questionAnswerLabel = document.createElement("label");
			questionAnswer.type = "radio";
			questionAnswer.name = "answer";
			questionAnswer.value = answer;
			questionAnswer.id = answer;
			questionAnswerLabel.innerHTML = answer;
			questionAnswerLabel.setAttribute("for", answer);

			containerAnswer.classList.add("radio-button");
			containerAnswer.appendChild(questionAnswer);
			containerAnswer.appendChild(questionAnswerLabel);

			answers.push(containerAnswer);
		});
	}

	// CHANGING THE VALUES DISPLAYED IN THE ELEMENTS
	document.querySelector(".titleQuiz").innerHTML = question.theme;
	questionTexte.innerHTML = question.question;

	// ADDING THE ELEMENTS TO THE DIV IN THE HTML CODE
	quizContainer.appendChild(questionTexte);
	answers.forEach((answer) => {
		quizContainer.appendChild(answer);
	});
}

function displayResults(results) {
	const quizContainer = document.querySelector(".descriptionQuiz");

	quizContainer.innerHTML = `<div class='results'> ${results}kg CO2/an </div>`;
	document.getElementById("buttsuiv").textContent =
		"Save the answers and results";

	// CHANGING THE VALUES DISPLAYED IN THE ELEMENTS
	document.querySelector(".titleQuiz").innerHTML = "Results";

	$(".descriptionQuiz").animate(
		{
			opacity: 1,
			height: "50px",
		},
		1000,
		function () {
			document
				.querySelector(".habitsQuiz")
				.addEventListener("click", saveUserResults);
		}
	);
}
function changeDisplayForResults() {
	const quizContainer = document.querySelector(".descriptionQuiz");
	document.querySelector(".habitsQuiz").enable = false;
	$(".descriptionQuiz").animate(
		{
			opacity: 0,
			height: "0px",
		},
		1000,
		function () {
			quizContainer.innerHTML = "";
			calculateCO2WithTheAnswers();
		}
	);
}

function calculateCO2WithTheAnswers() {
	var kmVoiture = questions[1].userAnswer || 0;
	var typeVoiture = questions[4].userAnswer || "Gasoline";
	var kmPlane = questions[5].userAnswer || 0;
	var kmTrain = questions[6].userAnswer || 0;
	var kmMetro = questions[7].userAnswer || 0;
	var kmBus = questions[8].userAnswer || 0;
	var typeHeating = questions[9].userAnswer || "Electricity";
	var typeElectricity = questions[10].userAnswer || "Nuclear";
	var freqmeat = questions[11].userAnswer || 0;
	var local = questions[12].userAnswer || "No"
	var sizeHome = questions[13].userAnswer || 0;
	$.get("./assets/json/data.json", function (data) {
		displayResults(Math.round(getTotalTransport(kmVoiture, typeVoiture, kmBus, kmPlane, kmTrain, kmMetro, data) + 
		heatingConsommation(findInJson(data, "chauffage"+typeHeating), sizeHome) + 
		electricityProduction(findInJson(data, "electricity"+typeElectricity),sizeHome,data) +
		eatMeat(freqmeat,local,data)));
	return;
	});
}
function saveUserResults() {
	function backData(retour) {
		const btnToChange = document.getElementById("buttsuiv");
		if (retour.error) {
			btnToChange.textContent = "Try again ! 🔁";
		} else {
			btnToChange.textContent = "Answers saved ! ✅";
			btnToChange.disabled = true;
		}
	}

	const linkerId = generateUUID();

	let userNotLog = false;



	questions.forEach((element) => {
		if (!userNotLog) {
			const dataForRequest = {
				typeinserted: "insertHabitsUser",
				userId: document.getElementById("idUser").value,
				linkerId: linkerId,
				questionId: element.id,
				questionAnswer:
					element.userAnswer !== undefined
						? element.userAnswer
						: null,
			};
			// console.log(dataForRequest);
			try {
				if (canSave === true) {
					insertionDataBase(dataForRequest, backData);
				}
			} catch {
				userNotLog = true;
			}
		}
	});

	if (userNotLog) {
		saveUserAnswerForLogin();
	}
}

function saveUserAnswerForLogin() {
	function returnDataTreatment(results) {
		location.href = "/my-environment/login/index.php?toSave=true";
	}

	const linkerId = generateUUID();

	const dataForRequest = {
		typeinserted: "insertHabitsUser",
		questions: questions,
		linkerId: linkerId,
	};

	saveTempAnswerForLogin(dataForRequest, returnDataTreatment);
}

document.querySelector(".habitsQuiz").addEventListener("click", startQuiz);