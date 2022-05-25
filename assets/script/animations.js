let newScript = document.createElement("script");
newScript.src = "https://unpkg.com/scrollreveal";
document.querySelector("head").appendChild(newScript);

window.onload = () => {
	main();
	document.querySelector("#mainPage").style.opacity = "1";
	const loader = document.querySelector("#loader");
	loader.style.opacity = 0;
	setTimeout(()=>{
		loader.style.display = "none";
	}, 200);
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
