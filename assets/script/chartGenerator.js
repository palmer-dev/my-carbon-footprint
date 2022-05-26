// GLOBAL VARIABLE
let elementSet = 1;
const colors = ["#FF4800","#FF5400","#FF6000","#FF6D00","#FF7900","#FF8500","#FF9100","#FF9E00","#FFAA00","#FFB600"];

// FUNCTIONS
export function chartGenerator(tableau, callBack) {
	const maximalValue = tableau[0].co2;
	for (let index = 0; index < 5; index++) {
		// VARIABLE VALUE
		const nameCountry = tableau[index].country;
		const value = tableau[index].co2;
		const percentage = (value / maximalValue) * 100;

		// PARENT TABLE
		const parent = document.getElementById("chart");

		// CREATION OF THE NEW LINE
		const newLine = document.createElement("tr");

		// CREATION OF THE FIRST COLUMN
		const newColumn1 = document.createElement("td");
		const newChartValue = document.createElement("div");
		const newChartValueDisplay = document.createElement("h3");
		newChartValueDisplay.innerHTML =
			parseFloat(value) >= 1000
				? (parseFloat(value) / 1000).toLocaleString() + "k"
				: value; //+ " MT CO2";
		newChartValue.appendChild(newChartValueDisplay);
		newColumn1.appendChild(newChartValue);

		// CREATION OF THE SECOND COLUMN
		const newColumn2 = document.createElement("td");
		const newCountry = document.createElement("h3");
		newCountry.innerHTML = nameCountry;
		newColumn2.appendChild(newCountry);

		// ADDING THE NEW COLUMNS IN THE LINE
		newLine.appendChild(newColumn1);
		newLine.appendChild(newColumn2);

		// ADDING THE NEW LINE IN THE TABLE
		parent.appendChild(newLine);
		transitionChart(percentage, newChartValue);
	}
	callBack();
}

function transitionChart(width, element) {
	setTimeout((noLine) => {
		element.style.background = colors[noLine];
		element.style.width = width + "%";
	}, elementSet * 200, elementSet);
	elementSet += 1;
}
