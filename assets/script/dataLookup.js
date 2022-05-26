// INCLUDES MODULES
import { chartGenerator } from "./chartGenerator.js";
import { setDataCO2, setObserverChart } from "./script.js";

// DATA FROM THE INTERNATIONAL DATA BASE IN CARBON EMISSION
export function getEmitterData() {
	let CSVFile =
		"https://raw.githubusercontent.com/owid/co2-data/master/owid-co2-data.csv";
	let dataCSVfile = new XMLHttpRequest();
	dataCSVfile.overrideMimeType("text/plain; charset=ISO-8859-1");
	dataCSVfile.open("GET", CSVFile, true);
	dataCSVfile.send(null);

	dataCSVfile.onload = function (xml2e) {
		let dataCSVbrut = dataCSVfile.responseText;

		// TREATMENT OF THE DATA
		dataCSVbrut = dataCSVbrut.split(/\r\n|\n/);

		let dataCSV = [];
		let headers = dataCSVbrut[0].split(",");

		for (let ligne = 1; ligne < dataCSVbrut.length; ligne++) {
			let dataLigne = dataCSVbrut[ligne];
			let nvDataLigne = {};
			let tmp = dataLigne.split(",");
			for (let colonne = 0; colonne < tmp.length; colonne++) {
				nvDataLigne[headers[colonne]] = tmp[colonne];
			}
			dataCSV.push(nvDataLigne);
		}

		const max_year = dataCSV.sort((a, b) =>
			parseFloat(a.year) > parseFloat(b.year) ? -1 : 1
		)[0].year; // SORT THE YEAR, THE NEWEST FIRST
		let CO2 = dataCSV
			.sort((a, b) => (parseFloat(a.co2) > parseFloat(b.co2) ? -1 : 1))
			.sort((a, b) => (parseFloat(a.year) > parseFloat(b.year) ? -1 : 1)); // SORT THE VALUES FROM THE BIGGEST TO THE LOWEST
		CO2 = CO2.filter((item) => item.country !== "World").filter(
			(item) => item.iso_code !== ""
		);
		chartGenerator(CO2, setObserverChart);
		setDataCO2(CO2);
	};
}