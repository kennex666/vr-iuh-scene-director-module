import { createAxisEntity } from "../a-frame/axis-helper.js";
import { getForwardPosition } from "../a-frame/camera.js";

export function getInfoHotspot(id) {
	let hotspot = document.querySelector(`a-entity[location-id='${id}']`);
	if (!hotspot) {
		hotspot = document.querySelector(`a-entity[plugin-id='${id}']`);
	}

	const type = hotspot.getAttribute("spot-type") || "goAHead";
	const position = hotspot.getAttribute("position") || { x: 0, y: 0, z: 0 };
	const rotation = hotspot.getAttribute("rotation") || { x: 0, y: 0, z: 0 };
	const scale = hotspot.getAttribute("scale") || { x: 1, y: 1, z: 1 };

	return {
		id,
		type,
		title: "Unknown Title",
		position,
		rotation,
		scale,
	};
}
/**
 * Find a hotspot by its ID
 * @param {string} id - The ID of the hotspot to find from scene
 * @returns {boolean} - True if found and focused, false if not found
 */
export function findHotspot(id) {
	const sceneEl = document.querySelector("a-scene");
	const hotspot =
		sceneEl.querySelector(`a-entity[location-id='${id}']`) || sceneEl.querySelector(`a-entity[plugin-id='${id}']`);
	const hotspotHitBox = hotspot?.querySelector("[axis-selector]");
	const cameraEl = sceneEl.querySelector("[camera]");
	const lookComponent = cameraEl?.components["custom-look"];
	const data = __hotspots.find((h) => h.id === id);

	if (hotspot && hotspotHitBox) {
		// Gọi click
		const click = new MouseEvent("click", {
			view: window,
			bubbles: true,
			cancelable: true,
		});
		hotspotHitBox.dispatchEvent(click);

		// --- Lấy vị trí của hotspot ---
		const hotspotPos = new THREE.Vector3();
		hotspot.object3D.getWorldPosition(hotspotPos);

		// --- Lấy vị trí của camera ---
		const cameraPos = new THREE.Vector3();
		cameraEl.object3D.getWorldPosition(cameraPos);

		// --- Tính hướng nhìn ---
		const targetVector = new THREE.Vector3().subVectors(hotspotPos, cameraPos).normalize();
		const targetRotation = new THREE.Euler().setFromVector3(
			new THREE.Vector3(Math.asin(targetVector.y), Math.atan2(-targetVector.x, -targetVector.z), 0)
		);

		// --- Cập nhật rotation cho camera ---
		cameraEl.object3D.rotation.x = targetRotation.x;
		cameraEl.object3D.rotation.y = targetRotation.y;

		// --- Nếu custom-look có sự kiện cập nhật ---
		if (lookComponent) {
			cameraEl.emit("update-xy", {
				x: targetRotation.x,
				y: targetRotation.y,
			});
		}
		return true;
	} else {
		// Create popup to select type of hotspot
		PopupSelectTypeHotspot((selectedType) => {
			// Dispatch event add-hotspot
			document.dispatchEvent(
				new CustomEvent("add-hotspot", {
					detail: {
						id: id,
						type: selectedType,
						position: getForwardPosition(5),
						rotation: { x: 0, y: 0, z: 0 },
						scale: { x: 1, y: 1, z: 1 },
						title: data.name,
						imageUrl: data.imageUrl,
					},
				})
			);
		});
		return false;
	}
}

/**
 * Create a hotspot element
 * @param {Object} param0 - The hotspot data
 * @returns {HTMLElement} The created hotspot element
 */
export function HotspotsElement({ id, name, imageUrl }) {
	const li = document.createElement("li");
	const button = document.createElement("button");
	button.className = "w-full text-left px-2 py-1 rounded hover:bg-white/30 relative";
	button.setAttribute("data-location-id", id);
	button.setAttribute("onclick", `findHotspot('${id}')`);
	const img = document.createElement("img");
	img.src = imageUrl;
	img.alt = name;
	img.className = "w-full h-28 object-cover inline-block";
	const div = document.createElement("div");
	div.className = "bottom-1 absolute px-2 py-1 bg-[--color-primary] text-sm";
	div.textContent = name;
	button.appendChild(img);
	button.appendChild(div);
	li.appendChild(button);
	return li;
}

/**
 * Create a hotspot element
 * @param {Object} param0 - The hotspot data
 * @returns {HTMLElement} The created hotspot element
 */
export function HotspotsElementPlugin({ id, name, imageUrl }) {
	const li = document.createElement("li");
	const button = document.createElement("button");
	button.className = "w-full text-left px-2 py-1 rounded hover:bg-white/30 relative";
	button.setAttribute("data-location-id", id);
	button.setAttribute("onclick", `findHotspot('${id}')`);
	const img = document.createElement("img");
	img.src = imageUrl || "../img/plugin.jpg";
	img.alt = name || id;
	img.className = "w-full h-28 object-cover inline-block";
	const div = document.createElement("div");
	div.className = "bottom-1 absolute px-2 py-1 bg-[--color-primary] text-sm";
	div.textContent = name;
	button.appendChild(img);
	button.appendChild(div);
	li.appendChild(button);
	return li;
}
/**
 * Get all hotspots from the current A-Frame scene
 * @returns {Array} Array of hotspot objects with id, type, position, rotation, scale
 */
export const getSpotsFromScene = () => {
	const sceneEl = document.querySelector("a-scene");
	const spots = sceneEl.querySelectorAll("a-entity[location-id]");
	const result = [];
	spots.forEach((spot) => {
		const id = spot.getAttribute("location-id") || "unknown-id";
		const type = spot.getAttribute("spot-type") || "goAHead";
		const position = spot.getAttribute("position") || { x: 0, y: 0, z: 0 };
		const rotation = spot.getAttribute("rotation") || { x: 0, y: 0, z: 0 };
		const scale = spot.getAttribute("scale") || { x: 1, y: 1, z: 1 };
		result.push({
			id,
			type,
			title: "Unknown Title",
			position,
			rotation,
			scale,
		});
	});
	return result;
};

export const getPluginsFromScene = () => {
	const sceneEl = document.querySelector("a-scene");
	const plugins = sceneEl.querySelectorAll("a-entity[plugin-id]");
	const result = [];
	plugins.forEach((spot) => {
		const id = spot.getAttribute("plugin-id") || "unknown-id";
		const type = spot.getAttribute("spot-type") || "goAHead";
		const position = spot.getAttribute("position") || { x: 0, y: 0, z: 0 };
		const rotation = spot.getAttribute("rotation") || { x: 0, y: 0, z: 0 };
		const scale = spot.getAttribute("scale") || { x: 1, y: 1, z: 1 };
		result.push({
			id,
			type,
			title: "Unknown Title",
			position,
			rotation,
			scale,
		});
	});
	return result;
};

/**
 * Element popup to select type of hotspot
 * @param {*} onSelect
 */
export function PopupSelectTypeHotspot(onSelect) {
	const popup = document.createElement("div");
	popup.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
	popup.innerHTML = `
        <div class="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 class="text-lg font-bold mb-4">Chọn loại hotspot</h2>
            <div class="mb-4 text-sm">Điểm này chưa được thêm vào cảnh mới, hãy chọn loại hotpots:</div>
            <select id="hotspot-type" class="w-full border border-gray-300 rounded p-2 mb-4">
                <option value="goAHead">Mũi tên chỉ đường</option>
                <option value="markPoint">Điểm nhấp nháy</option>
            </select>
            <div class="flex justify-end">
                <button id="cancel-btn" class="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
                <button id="select-btn" class="bg-blue-500 text-white px-4 py-2 rounded">Select</button>
            </div>
        </div>
    `;
	document.body.appendChild(popup);
	popup.querySelector("#cancel-btn").onclick = () => {
		document.body.removeChild(popup);
	};
	popup.querySelector("#select-btn").onclick = () => {
		const selectedType = popup.querySelector("#hotspot-type").value;
		onSelect(selectedType);
		document.body.removeChild(popup);
	};
}

/**
 * Load hotspots from array to the location list
 * @param {Array} hotspots - Array of hotspot objects with id, name, imageUrl
 */
export function loadHotspots(hotspots) {
	const container = document.getElementById("location-list");
	if (!container) {
		console.error('Element with id "location-list" not found.');
		return;
	}
	container.innerHTML = ""; // Clear existing hotspots

	hotspots.forEach((hotspot) => {
		const hotspotElement = HotspotsElement(hotspot);
		container.appendChild(hotspotElement);
	});

	__hotspots = hotspots;

	if (hotspots.length === 0) {
		const noHotspotMsg = document.createElement("li");
		noHotspotMsg.innerHTML = `<li>
        <p class="text-center text-white">Chưa có địa điểm nào tại hotspot. Vui lòng quay lại quản lý kịch bản để thêm địa điểm.</p>
       </li>`;
		container.appendChild(noHotspotMsg);
	}
}
/**
 * Load hotspots from array to the location list
 * @param {Array} hotspots - Array of hotspot objects with id, name, imageUrl
 */
export function loadPlugins(plugins) {
	const container = document.getElementById("plugin-list");
	if (!container) {
		console.error('Element with id "plugin-list" not found.');
		return;
	}
	container.innerHTML = ""; // Clear existing plugins

	plugins.forEach((plugin) => {
		const hotspotElement = HotspotsElementPlugin(plugin);
		container.appendChild(hotspotElement);
	});

	__plugins = plugins;

	if (plugins.length === 0) {
		const noPluginMsg = document.createElement("li");
		noPluginMsg.innerHTML = `<li>
        <p class="text-center text-white">Chưa có plugin nào được thêm vào. Vui lòng quay lại quản lý địa điểm để thêm plugin.</p>
       </li>`;
		container.appendChild(noPluginMsg);
	}
}
/**
 * Remove all hotspot spots from the scene
 */

export function removeAllSpots() {
	const sceneEl = document.querySelector("a-scene");
	const spots = sceneEl.querySelectorAll("a-entity[axis-helper]");

	for (let spot of spots) {
		sceneEl.removeChild(spot);
	}
	console.log("All spots removed.", { removedCount: spots.length });
}

export function changeTypeHotspot(id, newType) {
	const documentEl = document.querySelector("a-scene");
	let isPlugin = false;
	let oldEl = documentEl.querySelector(`a-entity[location-id='${id}']`);
	if (!oldEl) {
		oldEl = documentEl.querySelector(`a-entity[plugin-id='${id}']`);
		isPlugin = true;
	}
	const hotspot = getInfoHotspot(id);
	if (!hotspot) return false;

	console.log("Old hotspot element removed:", hotspot);
	createAxisEntity({ ...hotspot, type: newType, isPlugin });
	console.log("Changed hotspot type:", id, newType);

	setTimeout(() => {
		documentEl.removeChild(oldEl);
		setTimeout(() => {
			findHotspot(id);
		}, 2);
	}, 2);
	return true;
}

window.findHotspot = findHotspot;
