import { randomString } from "../utils/string.js";
import { createMarkPoint, createSpot } from "./hotspots-components.js";

/**
 * Create an axis entity for the hotspot
 * @param {Object} spot - The hotspot data
 * @returns {HTMLElement} The created axis entity
 */
export const createAxisEntity = (spot) => {
	const axisHelper = document.createElement("a-entity");
	axisHelper.id = `axis-entity-${randomString(12)}-${Date.now()}`;

	const type = spot.isPlugin ? "plugin" : "location";

	axisHelper.setAttribute(type + "-id", spot.id || "unknown");
	axisHelper.setAttribute(type + "-type", spot.type || "unknown");

	switch (spot.type) {
		case "goAHead":
			axisHelper.appendChild(createSpot(spot));
			break;
		case "markPoint":
			axisHelper.appendChild(createMarkPoint(spot));
			break;
		default:
			axisHelper.appendChild(createSpot(spot));
			break;
	}

	console.log("Added new hotpot:", axisHelper);

	document.querySelector("a-scene").appendChild(axisHelper);
	axisHelper.setAttribute("axis-helper", "");

	setTimeout(() => {
		axisHelper.setAttribute("position", spot.position);
		axisHelper.setAttribute("rotation", spot.rotation);
		axisHelper.setAttribute("scale", spot.scale);
	}, 1);
	return axisHelper;
};

export function createAxis({ id, rotation, axis, color }) {
	const axisEntity = document.createElement("a-entity");
	axisEntity.setAttribute("handle-drag-and-drop", `axis: ${axis}; targetEl: #${id}`);
	axisEntity.setAttribute("class", "axis");
	axisEntity.setAttribute("rotation", rotation);

	const shaft = document.createElement("a-entity");
	shaft.setAttribute("geometry", "primitive: cylinder; radius: 0.005; height: 1.2");
	shaft.setAttribute("position", "0 0.6 0");
	shaft.setAttribute("material", `color: ${color}`);
	shaft.setAttribute("class", "axis");

	const head = document.createElement("a-entity");
	head.setAttribute("geometry", "primitive: cone; radiusBottom: 0.06; height: 0.2");
	head.setAttribute("position", "0 1.3 0");
	head.setAttribute("material", `color: ${color}`);
	head.setAttribute("class", "axis");

	axisEntity.appendChild(shaft);
	axisEntity.appendChild(head);

	return axisEntity;
}

/**
 * Tạo helper trục X,Y,Z
 * @param {string} id - id của entity (mặc định "targetBox")
 * @param {string} position - vị trí (mặc định "0 1.25 -3")
 */
export function createAxisHelper(id = "targetBox", position = "0 1.25 -3") {
	const container = document.getElementById(id);
	if (!container) {
		console.error(`Element with id "${id}" not found.`);
		return false;
	}
	container.setAttribute("position", position);
	container.setAttribute("rotation", "0 0 0");

	const entity = document.createElement("a-entity");
	entity.setAttribute("class", "axis-helper");

	// X axis (red)
	entity.appendChild(
		createAxis({
			id: id,
			axis: "x",
			color: "#ff4444",
			rotation: "0 0 -90",
		})
	);

	// Y axis (green)
	entity.appendChild(
		createAxis({
			id: id,
			axis: "y",
			color: "#44ff44",
			rotation: "0 0 0",
		})
	);

	// Z axis (blue)
	entity.appendChild(
		createAxis({
			id: id,
			axis: "z",
			color: "#4444ff",
			rotation: "90 0 0",
		})
	);

	entity.setAttribute("visible", false);
	container.appendChild(entity);

	return true;
}
