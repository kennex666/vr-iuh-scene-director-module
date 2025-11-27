import { createAxisEntity } from "../a-frame/axis-helper.js";
import { removeAllSpots } from "../utils/hotspots.js";

/**
 * Load locations into the location select dropdown.
 * @param {Array} locations - Array of location objects with id and title
 */
export function loadLocations(locations) {
	if (!Array.isArray(locations)) {
		console.warn("Invalid locations data:", locations);
		return;
	}
	const popupSelect = document.getElementById("pop-cus-val-select");
	// Xóa hết option cũ (trừ cái đầu tiên)
	const options = popupSelect.querySelectorAll("option");
	for (let i = 1; i < options.length; i++) {
		popupSelect.removeChild(options[i]);
	}
	for (let loc of locations) {
		const option = document.createElement("option");
		option.value = loc.id;
		option.textContent = loc.title;
		popupSelect.appendChild(option);
	}
	// Ghi log số lượng location đã load
	console.log("Locations loaded:", locations.length);
}

/**
 * Load a scene into the 3D environment.
 * @param {Object} data - Scene data object
 * The scene data should include id, assets (with images), rotation, and spots.
 * Example:
 * {
 *   id: "scene-001",
 *   assets: { images: { highQuality: "url_to_image.jpg" } },
 *   rotation: { x: 0, y: 90, z: 0 },
 *   spots: [ { id, title, type, position, rotation }, ... ]
 * }
 */
export function loadScene(data) {
	const sceneData = data || null;
	if (!sceneData || !sceneData.id) {
		console.warn("Invalid scene data:", sceneData);
		return;
	}

	const currentLocationTitle = document.getElementById("current-location-title");
	currentLocationTitle.textContent = sceneData.title || "Unknown Location";

	currentScene = sceneData;
	console.log("Loading scene:", sceneData);

	removeAllSpots();

	const sceneEl = document.querySelector("a-scene");
	// Check if array
	if (sceneData.assets && sceneData.assets && Array.isArray(sceneData.assets)) {
		sceneData.assets = sceneData.assets[0];
	}
	if (sceneData.assets && sceneData.assets.images && sceneData.assets.images.highQuality) {
		const skyEl = sceneEl.querySelector("a-sky");
		if (skyEl) {
			skyEl.setAttribute("src", sceneData.assets.images.highQuality);
			skyEl.setAttribute("rotation", sceneData.rotation || { x: 0, y: 0, z: 0 });
			console.log("Sky image updated:", sceneData.assets.images.highQuality);
		}
	} else {
		console.warn("No valid sky image found in scene data.");
	}

	const spots = sceneData.spots || [];
	for (let spot of spots) {
		const aEntity = createAxisEntity({ ...spot, isPlugin: false });
	}

	const plugins = sceneData.plugins || [];
	for (let plugin of plugins) {
		const aEntity = createAxisEntity({ ...plugin, isPlugin: true });
	}

	console.log("Scene loaded with spots:", spots.length);
	// Load default rotation
	if (sceneData.rotation) {
		let cameraEl = document.querySelector("#cam");
		if (cameraEl && cameraEl.components["custom-look"]) {
			cameraEl.emit("update-xy", {
				x: sceneData.rotation.x,
				y: sceneData.rotation.y,
			});
			console.log("Camera rotation updated to:", sceneData.rotation);
		}
	}
}
