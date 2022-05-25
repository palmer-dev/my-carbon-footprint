// INCLUDES MODULES
import { chartGenerator } from "./chartGenerator.js";
import { setDataCO2, getObserver } from "./script.js";

// DATA FROM THE INTERNATIONAL DATA BASE IN CARBON EMISSION
export function getEmiterData() {
	var fichierCSV =
		"https://raw.githubusercontent.com/owid/co2-data/master/owid-co2-data.csv";
	var dataCSVfile = new XMLHttpRequest();
	dataCSVfile.overrideMimeType("text/plain; charset=ISO-8859-1");
	dataCSVfile.open("GET", fichierCSV, true);
	dataCSVfile.send(null);

	dataCSVfile.onload = function (xml2e) {
		var dataCSVbrut = dataCSVfile.responseText;

		// TRAITMENT OF THE DATA
		dataCSVbrut = dataCSVbrut.split(/\r\n|\n/);

		var dataCSV = [];
		var headers = dataCSVbrut[0].split(",");

		for (let ligne = 1; ligne < dataCSVbrut.length; ligne++) {
			var dataLigne = dataCSVbrut[ligne];
			var nvDataLigne = {};
			var tmp = dataLigne.split(",");
			for (let colonne = 0; colonne < tmp.length; colonne++) {
				nvDataLigne[headers[colonne]] = tmp[colonne];
			}
			dataCSV.push(nvDataLigne);
		}

		const max_year = dataCSV.sort((a, b) =>
			parseFloat(a.year) > parseFloat(b.year) ? -1 : 1
		)[0].year; // SORT THE YEAR, THE NEWEST FIRST
		var CO2 = dataCSV
			.sort((a, b) => (parseFloat(a.co2) > parseFloat(b.co2) ? -1 : 1))
			.sort((a, b) => (parseFloat(a.year) > parseFloat(b.year) ? -1 : 1)); // SORT THE VALUES FROM THE BIGGEST TO THE LOWEST
		CO2 = CO2.filter((item) => item.country !== "World").filter(
			(item) => item.iso_code !== ""
		);
		chartGenerator(CO2, getObserver);
		setDataCO2(CO2);
	};
}

// UTILITARY FONCTION
function triData(data, ColToOrder) {
	var dataOrdered = [];
	for (let idL = 0; idL < data.length; idL++) {
		var ligne = array[idL];
		for (let idC = 0; idC < ColToOrder.length; idC++) {
			const colOrdName = ColToOrder[idC][0]; // Name of the column to compare
			const colOrdValue = ColToOrder[idC][1]; // Value to compare with
			const colOrdComp = ColToOrder[idC][3]; // Type of comparison of data
			if (ligne[colOrd] == colOrdValue) {
			}
		}
	}
}
