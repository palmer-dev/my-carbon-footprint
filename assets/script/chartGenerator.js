export function chartGenerator(tableau, callBack) {
	// PALETTE OF COLORS
	var colors = [
		"#FF4800",
		"#FF5400",
		"#FF6000",
		"#FF6D00",
		"#FF7900",
		"#FF8500",
		"#FF9100",
		"#FF9E00",
		"#FFAA00",
		"#FFB600",
	];

	var comparisonPerc = tableau[0].co2;
	for (let index = 0; index < 5; index++) {
		// VARIABLE VALUE
		var nameCountry = tableau[index].country;
		var value = tableau[index].co2;
		var percentage = (value / comparisonPerc) * 100;

		// PARENT TABLE
		var parent = document.getElementById("chart");

		// CREATION OF THE NEW LINE
		var newLine = document.createElement("tr");

		// CREATION OF THE FIRST COLUMN
		var newColumn1 = document.createElement("td");
		var newChartValue = document.createElement("div");
		var newChartValueDisplay = document.createElement("h3");
		newChartValueDisplay.innerHTML =
			parseFloat(value) >= 1000
				? (parseFloat(value) / 1000).toLocaleString() + "k"
				: value; //+ " MT CO2";
		newChartValue.appendChild(newChartValueDisplay);
		newColumn1.appendChild(newChartValue);

		// CREATION OF THE SECOND COLUMN
		var newColumn2 = document.createElement("td");
		var newCountry = document.createElement("h3");
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

var elementSeted = 1;
var referenceHeight = 0;

function transitionChart(width, element, positionText) {
	setTimeout(() => {
		element.style.width = width + "%";
	}, elementSeted * 200);
	elementSeted += 1;
}
