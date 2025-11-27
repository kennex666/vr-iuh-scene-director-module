window.addEventListener("keydown", (event) => {
	if (event.altKey && event.key.toLowerCase() === "q") {
		event.preventDefault();
		document.getElementById("back-parent-btn").click();
	}
});
