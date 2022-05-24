let newScript = document.createElement("script");
newScript.src = "https://unpkg.com/scrollreveal";
document.querySelector("head").appendChild(newScript);

window.onload = () => {
	main();
	// alert("test");
};

function main() {
	ScrollReveal({
		distance: "120px",
	}).reveal(".normal", {
		origin: "right",
	});

	ScrollReveal({
		distance: "120px",
	}).reveal(".reverse", {
		origin: "left",
	});

	ScrollReveal({
		distance: "120px",
	}).reveal(".top-card", {
		origin: "top",
	});

	ScrollReveal({
		distance: "120px",
	}).reveal(".bottomReveal", {
		origin: "bottom",
	});
}
