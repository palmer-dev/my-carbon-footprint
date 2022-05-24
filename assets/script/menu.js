function generationBurger(menuElements) {
	// menuElements is a list of objects like {title : "", link: ""}
	const menu = document.getElementById("burger");
	for (let page = 0; page < menuElements.length; page++) {
		const pageInfos = menuElements[page];
		var newPageMenu = document.createElement("div");
		var newPageMenuP = document.createElement("p");
		newPageMenuP.innerHTML = pageInfos.title;
		newPageMenu.addEventListener("click", (e) => {
			document.location.href = pageInfos.link;
		});
		newPageMenu.appendChild(newPageMenuP);
		// if (page == menuElements.length - 1) {
		// 	newPageMenu.id = "lastMenuItem";
		// }
		newPageMenu.id = pageInfos.id;
		if (pageInfos.link == "/logout.php") {
			newPageMenuP.classList.add("logout");
		}
		menu.appendChild(newPageMenu);
	}
	menu.style.transform = "translateY(calc(-100% - 100px))";
	setTimeout(() => {
		menu.style.transition = "transform .5s";
	}, 10);
}

function dropBurger(checkbox) {
	var droped = checkbox.checked;
	const menu = document.getElementById("burger");
	if (droped) {
		window.addEventListener("scroll", defineTopMenu);
		defineTopMenu(menu);
	} else {
		window.removeEventListener("scroll", defineTopMenu);
		menu.style.transform = "translateY(calc(-100% - 100px))";
	}
}

function defineTopMenu() {
	const menu = document.getElementById("burger");
	const topBar = document.getElementsByTagName("nav")[0].offsetTop;
	menu.style.transform = "translateY(calc(0% + " + topBar + "px - 20px))";
}

function addSelectedItemMenu() {
	const pathName = window.location.pathname;
	switch (pathName) {
		case "/":
			document.getElementById("HP").classList.add("selectedMenu");
			break;
		case "/my-itinerary/":
			document.getElementById("MI").classList.add("selectedMenu");
			break;
		case "/my-environment/":
			document.getElementById("ME").classList.add("selectedMenu");
			break;
		case "/my-environment/login/":
			document.getElementById("ME").classList.add("selectedMenu");
			break;
		case "/my-environment/create-account/":
			document.getElementById("ME").classList.add("selectedMenu");
			break;
		case "/my-habits/":
			document.getElementById("MH").classList.add("selectedMenu");
			break;
	}
}

addSelectedItemMenu();
