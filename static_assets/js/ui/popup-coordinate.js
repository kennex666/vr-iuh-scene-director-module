import { changeTypeHotspot } from "../utils/hotspots.js";

/**
 * Open popup custom value
 */
export const openCustomValuePop = () => {
	const popup = document.querySelector("#popup-custom-value");
	popup.classList.toggle("hidden", false);
};

/**
 * Select the location in the popup select
 * @param {string} objId - The object id to select location for
 */
export const selectLocationTab = (objId) => {
	const id = document.querySelector(`#${objId}`).getAttribute("location-id");
	const type = document.querySelector(`#${objId}`).getAttribute("location-type");
	if (!id) {
		console.warn("No current object selected.");
		return;
	}

	const selectLocationEl = document.querySelector("#pop-cus-val-select");
	const selectLocationTypeEl = document.querySelector("#pop-cus-val-type-hotspot-select");
	// check if there is no data options in select
	const option = selectLocationEl.querySelector(`option[value="${id}"]`);
	if (!option) {
		const option = document.createElement("option");
		option.value = id;
		option.textContent = id;
		selectLocationEl.appendChild(option);
		option.selected = true;
	} else {
		option.selected = true;
	}

	if (type && selectLocationTypeEl) {
		const optionType = selectLocationTypeEl.querySelector(`option[value="${type}"]`);
		if (!optionType) {
			const option = document.createElement("option");
			option.value = type;
			option.textContent = type;
			selectLocationTypeEl.appendChild(option);
			option.selected = true;
		} else {
			optionType.selected = true;
		}
	}
};

/**
 * Set the custom object tab values
 * @param {string} id
 * @param {Object} param1 - The custom object values
 */
export const setCustomObjectTab = (id, { posX, posY, posZ, rotX, rotY, rotZ, scaleX, scaleY, scaleZ }) => {
	const popup = document.querySelector("#popup-custom-value");
	popup.setAttribute("current-object-id", id);
	popup.querySelector("input[data-input='posX']").value = posX;
	popup.querySelector("input[data-input='posY']").value = posY;
	popup.querySelector("input[data-input='posZ']").value = posZ;
	popup.querySelector("input[data-input='rotX']").value = rotX;
	popup.querySelector("input[data-input='rotY']").value = rotY;
	popup.querySelector("input[data-input='rotZ']").value = rotZ;
	popup.querySelector("input[data-input='scaleX']").value = scaleX;
	popup.querySelector("input[data-input='scaleY']").value = scaleY;
	popup.querySelector("input[data-input='scaleZ']").value = scaleZ;
	selectLocationTab(id);
};

/**
 * Handle popup tab modify
 */
export const handleTabModify = () => {
	const popup = document.querySelector("#popup-custom-value");

	// handle chuyển tab
	const tabButtons = popup.querySelectorAll("button[data-tab]");
	const tabContents = popup.querySelectorAll(".tab-content [tab]");

	// Listen select change
	const selectLocationEl = document.querySelector("#pop-cus-val-type-hotspot-select");
	selectLocationEl.addEventListener("change", (e) => {
		const currentObjId = popup.getAttribute("current-object-id");
		console.log("Input changed for object:", currentObjId);
		if (currentObjId) {
			// Apply all attributes to the object
			const obj = document.getElementById(currentObjId);
			if (!obj) {
				console.warn("Object not found:", currentObjId);
				return;
			}

			const oldType = obj.getAttribute("location-type");

			const locationId = obj.getAttribute("location-id");
			if (oldType != popup.querySelector("#pop-cus-val-type-hotspot-select").value) {
				changeTypeHotspot(locationId, popup.querySelector("#pop-cus-val-type-hotspot-select").value);
			}
		}
	});

	// Listen input change
	const inputs = popup.querySelectorAll("input[data-input]");
	inputs.forEach((input) => {
		input.addEventListener("input", () => {
			const currentObjId = popup.getAttribute("current-object-id");
			console.log("Input changed for object:", currentObjId);
			if (currentObjId) {
				// Apply all attributes to the object
				const obj = document.getElementById(currentObjId);
				if (!obj) {
					console.warn("Object not found:", currentObjId);
					return;
				}
				const posXInput = popup.querySelector("input[data-input='posX']");
				const posYInput = popup.querySelector("input[data-input='posY']");
				const posZInput = popup.querySelector("input[data-input='posZ']");
				const rotXInput = popup.querySelector("input[data-input='rotX']");
				const rotYInput = popup.querySelector("input[data-input='rotY']");
				const rotZInput = popup.querySelector("input[data-input='rotZ']");
				const scaleXInput = popup.querySelector("input[data-input='scaleX']");
				const scaleYInput = popup.querySelector("input[data-input='scaleY']");
				const scaleZInput = popup.querySelector("input[data-input='scaleZ']");

				const position = {
					x: parseFloat(posXInput.value) || 0,
					y: parseFloat(posYInput.value) || 0,
					z: parseFloat(posZInput.value) || 0,
				};
				const rotation = {
					x: parseFloat(rotXInput.value) || 0,
					y: parseFloat(rotYInput.value) || 0,
					z: parseFloat(rotZInput.value) || 0,
				};
				const scale = {
					x: parseFloat(scaleXInput.value) || 1,
					y: parseFloat(scaleYInput.value) || 1,
					z: parseFloat(scaleZInput.value) || 1,
				};
				obj.setAttribute("position", position);
				obj.setAttribute("rotation", rotation);
				obj.setAttribute("scale", scale);
			}
		});
	});

	tabButtons.forEach((btn) => {
		btn.addEventListener("click", () => {
			const tab = btn.getAttribute("data-tab");

			if (tab === "position" || tab === "rotation" || tab === "scale") {
				tabButtons.forEach((b) => {
					if (b === btn) {
						b.classList.add("bg-white/30");
					} else {
						b.classList.remove("bg-white/30");
					}
				});
				// ẩn hết
				tabContents.forEach((c) => c.classList.add("hidden"));
				// hiện cái tab được chọn
				const active = popup.querySelector(`[tab="${tab}"]`);
				if (active) active.classList.remove("hidden");
			}

			if (tab === "save") {
				// lấy input values
				const inputs = popup.querySelectorAll("input[data-input]");
				const values = {};
				inputs.forEach((i) => {
					values[i.dataset.input] = parseFloat(i.value) || 0;
				});
				console.log("Saved values:", values);
			}

			if (tab === "close") {
				popup.classList.add("hidden");
			}
		});
	});

	popup.setAttribute("current-object-id", "");

	document.addEventListener("position-change", (e) => {
		const currentObjId = popup.getAttribute("current-object-id");
		if (currentObjId && currentObjId !== e.detail.id) {
			console.log("Not the same object, ignore position-change event", currentObjId, e.detail.id);
			return;
		}
		const { x, y, z } = e.detail;
		const posXInput = popup.querySelector("input[data-input='posX']");
		const posYInput = popup.querySelector("input[data-input='posY']");
		const posZInput = popup.querySelector("input[data-input='posZ']");
		if (posXInput) posXInput.value = x.toFixed(6);
		if (posYInput) posYInput.value = y.toFixed(6);
		if (posZInput) posZInput.value = z.toFixed(6);
	});

	document.addEventListener("rotation-change", (e) => {
		const currentObjId = popup.getAttribute("current-object-id");
		if (currentObjId && currentObjId !== e.detail.id) {
			console.log("Not the same object, ignore rotation-change event", currentObjId, e.detail.id);
			return;
		}
		const { x, y, z } = e.detail;
		const rotXInput = popup.querySelector("input[data-input='rotX']");
		const rotYInput = popup.querySelector("input[data-input='rotY']");
		const rotZInput = popup.querySelector("input[data-input='rotZ']");
		if (rotXInput) rotXInput.value = x.toFixed(6);
		if (rotYInput) rotYInput.value = y.toFixed(6);
		if (rotZInput) rotZInput.value = z.toFixed(6);
	});

	document.addEventListener("scale-change", (e) => {
		const currentObjId = popup.getAttribute("current-object-id");
		if (currentObjId && currentObjId !== e.detail.id) {
			console.log("Not the same object, ignore scale-change event", currentObjId, e.detail.id);
			return;
		}
		const { x, y, z } = e.detail;
		const scaleXInput = popup.querySelector("input[data-input='scaleX']");
		const scaleYInput = popup.querySelector("input[data-input='scaleY']");
		const scaleZInput = popup.querySelector("input[data-input='scaleZ']");
		if (scaleXInput) scaleXInput.value = x.toFixed(6);
		if (scaleYInput) scaleYInput.value = y.toFixed(6);
		if (scaleZInput) scaleZInput.value = z.toFixed(6);
	});

	document.getElementById("pop-cus-val-select").addEventListener("change", (e) => {
		const selectedId = e.target.value;
		const currentObjId = popup.getAttribute("current-object-id");

		if (!currentObjId) {
			console.warn("No current object selected.");
			return;
		}
		const obj = document.getElementById(currentObjId);
		obj.setAttribute("location-id", selectedId);
	});
};
