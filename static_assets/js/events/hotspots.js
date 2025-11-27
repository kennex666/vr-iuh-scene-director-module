import { createAxisEntity } from "../a-frame/axis-helper.js";
import { findHotspot } from "../utils/hotspots.js";

/*
    Event listener for adding a new hotspot
*/
document.addEventListener("add-hotspot", (event) => {
	const spot = event.detail;

	const aEntity = createAxisEntity(spot);

	document.querySelector("a-scene").appendChild(aEntity);

	setTimeout(() => {
		findHotspot(spot.id);
	}, 300);
});
