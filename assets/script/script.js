var DataGouv;
var DataCO2;

export function setDataGouv(data) {
	DataGouv = data;
}

export function setDataCO2(data) {
	DataCO2 = data;
}

// INCLUDE MODULES
import { getGouvData, getEmiterData } from "./dataLookup.js";

// FONCTIONS OBSERVER
const observerDivSeparator = new ResizeObserver((entries) => {
	for (let entry of entries) {
		const width = Math.floor(entry.contentRect.width);
		const height = Math.floor(entry.contentRect.height);
		if (window.innerWidth <= 800) {
			document.getElementById("separator").style.height =
				height + 100 + "px";
		} else {
			document.getElementById("separator").style.height =
				height + 200 + "px";
		}

		var position_top =
			document.getElementById("lastDivSection").offsetTop +
			document.getElementById("lastDivSection").offsetHeight;
		document.getElementById("separator").style.top = position_top + "px";
	}
});

const observerChartSize = new ResizeObserver((entries) => {
	for (let entry of entries) {
		const width = Math.floor(entry.contentRect.width);
		const infoEl = entry.target.querySelector("h3");
		if (infoEl.offsetWidth > width) {
			infoEl.style.transform = "translateX(180%)";
		} else {
			infoEl.style.transform = "translateX(0%)";
		}
	}
});

export function getObserver() {
	document.querySelectorAll("#chart > tr > td > div").forEach((chartLine) => {
		observerChartSize.observe(chartLine);
	});
}

function init() {
	observerDivSeparator.observe(document.getElementById("sectionInSeparator"));
	getGouvData();
	getEmiterData();
}

// INITIALISATION
init();
