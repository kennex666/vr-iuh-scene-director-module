export function createMarkPoint(spot, type = "spot") {
	const planeElement = document.createElement("a-plane");
	planeElement.setAttribute("color", "transparent");
	planeElement.setAttribute("opacity", "0");
	planeElement.setAttribute("width", "1");
	planeElement.setAttribute("height", "1");
	planeElement.setAttribute("look-at", "#cam");
	const position = `0 0 0`;
	planeElement.setAttribute("position", position);

	const ringElement = document.createElement("a-ring");
	ringElement.setAttribute("radius-inner", "0.02");
	ringElement.setAttribute("radius-outer", "0.07");
	ringElement.setAttribute("look-at", "#cam");
	ringElement.setAttribute("color", "#fff");

	ringElement.setAttribute(
		"animation__scale",
		"property: scale; from: 0 0 0; to: 3 3 3; dur: 1500; easing: easeOutQuad; loop: true"
	);
	ringElement.setAttribute(
		"animation__opacity",
		"property: opacity; from: 1; to: 0; dur: 1500; easing: easeOutQuad; loop: true"
	);

	const ringElement2 = document.createElement("a-ring");
	ringElement2.setAttribute("radius-inner", "0.00");
	ringElement2.setAttribute("radius-outer", "0.05");
	ringElement2.setAttribute("look-at", "#cam");
	ringElement2.setAttribute("color", "#FF6B6B");

	ringElement2.setAttribute(
		"animation__scale",
		"property: scale; from: 0 0 0; to: 3 3 3; dur: 1500; easing: easeInOutSine; loop: true"
	);
	ringElement2.setAttribute(
		"animation__opacity",
		"property: opacity; from: 1; to: 0; dur: 1500; easing: easeInOutSine; loop: true"
	);

	const ringElement3 = document.createElement("a-ring");
	ringElement3.setAttribute("radius-inner", "0.07");
	ringElement3.setAttribute("radius-outer", "0.09");
	ringElement3.setAttribute("look-at", "#cam");
	ringElement3.setAttribute("color", "#262261");

	ringElement3.setAttribute(
		"animation__scale",
		"property: scale; from: 0 0 0; to: 3 3 3; dur: 1500; easing: easeInOutSine; loop: true"
	);
	ringElement3.setAttribute(
		"animation__opacity",
		"property: opacity; from: 1; to: 0; dur: 1500; easing: easeInOutSine; loop: true"
	);

	planeElement.appendChild(ringElement);
	planeElement.appendChild(ringElement2);
	planeElement.appendChild(ringElement3);
	planeElement.classList.add("clickable");
	planeElement.setAttribute("axis-selector", "");

	return planeElement;
}

export function createSpot(spot, type = "spot") {
	const spotElement = document.createElement("a-image");

	const position = `0 0 0`;
	spotElement.setAttribute("position", position);
	spotElement.setAttribute("src", "#hotspot");

	// lấy rotation của spot
	spotElement.setAttribute("rotation", `0 0 0`);

	spotElement.setAttribute(
		"animation",
		"property: scale; from: 1 1 1; to: 1.3 1.3 1.3; dir: alternate; dur: 700; loop: true"
	);

	spotElement.classList.add("clickable");
	spotElement.setAttribute("axis-selector", "");

	if (type === "plugin") {
		spotElement.setAttribute("", "#pluginHotspot");
	}

	return spotElement;
}

export function createSpotGroup(id, location, isShow = false) {
	const spotGroup = document.createElement("a-entity");
	spotGroup.id = "spotGroup" + "-" + id;

	spotGroup.setAttribute("scale", isShow ? "1 1 1" : "0 0 0");

	if (location.spots)
		location.spots.forEach((spot) => {
			if (spot.type == "goAHead") {
				const spotElement = createSpot(spot);
				spotGroup.appendChild(spotElement);
			} else if (spot.type == "markPoint") {
				const spotElement = createMarkPoint(spot);
				spotGroup.appendChild(spotElement);
			}
		});

	if (location.plugins)
		location.plugins.forEach((plugin) => {
			if (plugin.type == "goAHead") {
				const spotElement = createSpot(plugin);
				spotGroup.appendChild(spotElement);
			} else if (plugin.type == "markPoint") {
				const spotElement = createMarkPoint(plugin);
				spotGroup.appendChild(spotElement);
			}
		});
	return spotGroup;
}
